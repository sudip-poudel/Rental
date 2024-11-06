"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.getUserById = exports.handleUpdateUserAvater = exports.updatePasswordHandler = exports.verifyUpdatePassword = exports.handleForgetPassword = exports.handleLogout = exports.handleLogin = exports.handleSignup = exports.oAuth2Server = exports.oAuthHandler = void 0;
const db_1 = require("../db");
const schema_1 = require("../schema/schema");
const drizzle_orm_1 = require("drizzle-orm");
const generateToken_1 = require("../helper/generateToken");
const config_1 = require("../config");
const loginHelper_1 = require("../helper/loginHelper");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleCloudinaryUpload_1 = require("../helper/handleCloudinaryUpload");
//** Auth Routes */
const handleSignup = async (req, res) => {
    const { email, password, name, } = req.body;
    console.log(email, password, name);
    if (!email || !password) {
        return res
            .status(400)
            .send({ success: false, message: "Username and password are required" });
    }
    try {
        const user = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.email, email),
        });
        if (user) {
            return res
                .status(400)
                .send({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await db_1.db
            .insert(schema_1.users)
            .values({ email: email, password: hashedPassword, name: name })
            .returning({ id: schema_1.users.id, name: schema_1.users.name, email: schema_1.users.email });
        const id = { id: data[0].id };
        const userData = {
            id: data[0].id,
            name: data[0].name,
            email: data[0].email,
        };
        const token = (0, generateToken_1.generateToken)(id);
        const stringifiedData = JSON.stringify(userData);
        console.log(stringifiedData);
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            httpOnly: true,
            domain: ".rental-backend-five.vercel.app",
            secure: true,
        });
        res.cookie("userdata", stringifiedData, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            httpOnly: true,
            domain: ".rental-backend-five.vercel.app",
            secure: true,
        });
        res.status(200).send({ success: true, message: "Signup successful" });
        return;
    }
    catch (error) {
        return res.status(404).send("Internal server error");
    }
};
exports.handleSignup = handleSignup;
const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
        return res
            .status(400)
            .send({ success: false, messege: "Username and password are required" });
    }
    try {
        const user = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.email, email),
            columns: {
                id: true,
                email: true,
                name: true,
                password: true,
            },
        });
        if (!user) {
            return res
                .status(400)
                .send({ success: false, message: "User not found" });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res
                .status(400)
                .send({ success: false, message: "Invalid password" });
        }
        const token = (0, generateToken_1.generateToken)({ id: user.id });
        console.log("testing");
        const stringifiedUserData = JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
        });
        console.log(stringifiedUserData);
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            domain: ".rental-backend-five.vercel.app",
            httpOnly: true,
            secure: true,
        });
        res.cookie("userdata", stringifiedUserData, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            domain: ".rental-backend-five.vercel.app",
            httpOnly: true,
            secure: true,
        });
        return res.status(200).send({ success: true, message: "Login successful" });
    }
    catch (error) {
        console.error(error);
    }
};
exports.handleLogin = handleLogin;
const handleLogout = async (req, res) => {
    res.clearCookie("token", {
        maxAge: 0,
        domain: ".rental-backend-five.vercel.app",
        secure: true,
        sameSite: "none",
        path: "/",
    });
    res.clearCookie("userdata", {
        maxAge: 0,
        domain: ".rental-backend-five.vercel.app",
        secure: true,
        sameSite: "none",
        path: "/",
    });
    res.status(200).send({ success: true, message: "Logged out successfully" });
};
exports.handleLogout = handleLogout;
//* Google Auth*//
const oAuthHandler = (_, res) => {
    const REDIRECT_URI = `${config_1.BACKEND_URL}/user/oauthsuccess`;
    // ENV === "PROD"
    //   ? "https://rental-backend-five.vercel.app/user/oauthsuccess"
    //   : "http://localhost:3000/user/oauthsuccess";
    // const REDIRECT_URI = "http://localhost:3000/user/oauthsuccess";
    const GOOGLE_OAUTH_SCOPES = [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ];
    // Prevent CSRF and more
    const state = "some_state";
    // const scopes = GOOGLE_OAUTH_SCOPES.join("+");
    const scopes = "https://www.googleapis.com/auth/userinfo.profile";
    console.log(scopes);
    // Generate url from auth request
    // (A pattern, check docs)
    const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${config_1.GOOGLE_OAUTH_URL}?client_id=${config_1.GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&access_type=offline&response_type=code&scope=${scopes}`;
    console.log(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
    // Redirect to concent page
    res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
};
exports.oAuthHandler = oAuthHandler;
const oAuth2Server = async (req, res, next) => {
    // Get code out of query (Authorization Code)
    // TODO: Maybe, validate state
    const { code } = req.query;
    // const REDIRECT_URI = "http://localhost:3000/user/oauthsuccess";
    const REDIRECT_URI = `${config_1.BACKEND_URL}/user/oauthsuccess`;
    // ENV === "PROD"
    //   ? "https://rental-backend-five.vercel.app/user/oauthsuccess"
    //   : "http://localhost:3000/user/oauthsuccess";
    // Ask for Access Token
    const data = {
        code,
        client_id: config_1.GOOGLE_CLIENT_ID,
        client_secret: config_1.GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
    };
    // Exchange authorization code for access token & id_token
    const response = await fetch(config_1.GOOGLE_ACCESS_TOKEN_URL, {
        method: "POST",
        body: JSON.stringify(data),
    });
    const access_token_data = await response.json();
    console.log(access_token_data);
    const { id_token } = access_token_data;
    // verify and extract the information in the id token
    const token_info_response = await fetch(`${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`);
    // TODO: TYPE
    const token_info_response_json = await token_info_response.json();
    console.log(token_info_response_json);
    const { name, email } = token_info_response_json;
    console.log(name, email);
    try {
        const user = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.email, email),
            columns: {
                id: true,
                email: true,
                name: true,
            },
        });
        if (user) {
            const resp = (0, loginHelper_1.loginHelper)(user, res);
            if (resp.success) {
                // res.redirect("http://localhost:5173");
                res.redirect(`${config_1.FRONTEND_URL}`);
            }
        }
        //it there is no user with the email, create a new user
        const data = await db_1.db
            .insert(schema_1.users)
            .values({ email: email, name: name })
            .returning({ id: schema_1.users.id, name: schema_1.users.name, email: schema_1.users.email });
        const resp = (0, loginHelper_1.loginHelper)(data[0], res);
        if (resp.success) {
            // res.redirect("http://localhost:5173")
            res.redirect(`${config_1.FRONTEND_URL}`);
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.oAuth2Server = oAuth2Server;
//forgetpassword handler
const handleForgetPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res
            .status(400)
            .send({ success: false, message: "Email is required" });
    }
    try {
        const user = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.email, email),
        });
        if (!user) {
            return res
                .status(400)
                .send({ success: false, message: "User not found" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });
        //insert the token in user table to check its validity
        await db_1.db
            .update(schema_1.users)
            .set({ resetPasswordToken: token })
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, user.id));
        //send email to the user with a link to reset password
        const resetURL = `${config_1.BACKEND_URL}/user/updatepassword/${token}`;
        //create tranponder for nodemailer
        const transponder = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: config_1.GMAIL_ID,
                pass: config_1.GMAIL_PASS,
            },
        });
        const mailOptions = {
            from: config_1.GMAIL_ID,
            to: email,
            subject: "Password Reset",
            text: `Click on the link to reset your password ${resetURL}`,
        };
        //send email
        await transponder.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            console.log("Email sent: " + info.response);
            res.send(201).json({ success: true, message: "Email sent" });
        });
    }
    catch (error) {
        console.error(error);
    }
};
exports.handleForgetPassword = handleForgetPassword;
const verifyUpdatePassword = async (req, res) => {
    const { token } = req.params;
    if (!token) {
        return res.redirect(`${config_1.FRONTEND_URL}/signin`);
    }
    console.log(token);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log(decoded, "fasdfasd");
        if (!decoded) {
            return res.redirect(`${config_1.FRONTEND_URL}/signin`);
        }
        const userId = decoded.id;
        const resetToken = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.id, userId),
            columns: {
                resetPasswordToken: true,
                email: true,
            },
        });
        console.log(resetToken, typeof resetToken);
        if (resetToken?.resetPasswordToken !== null && resetToken) {
            const tkn = resetToken.resetPasswordToken;
            console.log(tkn);
            if (tkn == token) {
                return res.redirect(`${config_1.FRONTEND_URL}/updatepassword?token=${token}&email=${resetToken.email}`);
            }
            res.redirect(`${config_1.FRONTEND_URL}/fdkfjalksdjflkjsdlfkjsdljf`);
        }
        return res.redirect(`${config_1.FRONTEND_URL}/signin`);
    }
    catch (error) {
        console.error(error);
    }
};
exports.verifyUpdatePassword = verifyUpdatePassword;
const updatePasswordHandler = async (req, res) => {
    const { password, token } = req.body;
    console.log(password, token);
    if (!password || !token) {
        return res
            .status(400)
            .send({ success: false, message: "Password and token are required" });
    }
    if (password.length < 6) {
        return res.status(400).send({
            success: false,
            message: "Password must be at least 6 characters",
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(400).send({ success: false, message: "Invalid token" });
        }
        const resetUrl = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.id, decoded.id),
            columns: {
                resetPasswordToken: true,
            },
        });
        if (resetUrl?.resetPasswordToken !== token) {
            return res.status(400).send({ success: false, message: "Invalid token" });
        }
        const userId = decoded.id;
        const hashedPassword = await bcrypt.hash(password, 10);
        await db_1.db
            .update(schema_1.users)
            .set({ password: hashedPassword, resetPasswordToken: null })
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId));
        res
            .status(200)
            .send({ success: true, message: "Password updated successfully" });
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(400).send({ success: false, message: "Token expired" });
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(400).send({ success: false, message: "Invalid token" });
        }
        else if (error instanceof jsonwebtoken_1.default.NotBeforeError) {
            return res
                .status(400)
                .send({ success: false, message: "Token not active" });
        }
        console.error(error);
    }
};
exports.updatePasswordHandler = updatePasswordHandler;
/**UPDATE USER DETAILS */
const handleUpdateUserAvater = async (req, res) => {
    const photo = req.file;
    const userId = req.params.userId;
    console.log(photo, "photos");
    if (!photo) {
        return res
            .status(400)
            .send({ success: false, message: "No image uploaded" });
    }
    try {
        const b64 = Buffer.from(photo.buffer).toString("base64");
        let dataURI = ("data:" + photo.mimetype) + ";base64," + b64;
        const cldRes = await (0, handleCloudinaryUpload_1.handleAvatarImageUpload)(dataURI);
        const avatarUrl = cldRes.secure_url;
        const user = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.id, userId),
        });
        if (!user) {
            return res
                .status(400)
                .send({ success: false, message: "User not found" });
        }
        await db_1.db
            .update(schema_1.users)
            .set({ profileUrl: avatarUrl })
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId));
        res.status(200).send({ success: true, message: "Profile picture updated" });
    }
    catch (error) {
        res.status(400).send({ success: false, message: "Internal server error" });
    }
};
exports.handleUpdateUserAvater = handleUpdateUserAvater;
/** User Routes */
const getCurrentUser = async (req, res) => {
    const id = req.params.userId;
    console.log(id);
    try {
        const user = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.id, id),
            columns: {
                password: false,
                resetPasswordToken: false,
            },
        });
        if (!user) {
            return res
                .status(400)
                .send({ success: false, message: "User not found" });
        }
        res.status(200).send({ success: true, data: user });
    }
    catch (error) {
        console.error(error);
    }
};
exports.getCurrentUser = getCurrentUser;
const getUserById = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const user = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.id, id),
            columns: {
                password: false,
                resetPasswordToken: false,
            },
        });
        if (!user) {
            return res
                .status(400)
                .send({ success: false, message: "User not found" });
        }
        res.status(200).send({ success: true, data: user });
    }
    catch (error) {
        console.error(error);
    }
};
exports.getUserById = getUserById;
