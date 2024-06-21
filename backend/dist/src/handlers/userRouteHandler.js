"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogout = exports.handleLogin = exports.handleSignup = exports.oAuth2Server = exports.oAuthHandler = void 0;
const db_1 = require("../db");
const schema_1 = require("../schema/schema");
const drizzle_orm_1 = require("drizzle-orm");
const generateToken_1 = require("../helper/generateToken");
const config_1 = require("../config");
const loginHelper_1 = require("../helper/loginHelper");
const bcrypt = require("bcrypt");
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
        });
        res.cookie("userdata", stringifiedData, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
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
        const stringifiedUserData = JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
        });
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie("userdata", stringifiedUserData, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).send({ success: true, message: "Login successful" });
    }
    catch (error) {
        console.error(error);
    }
};
exports.handleLogin = handleLogin;
const handleLogout = async (req, res) => {
    res.clearCookie("token");
    res.clearCookie("userdata");
    res.status(200).send({ success: true, message: "Logged out successfully" });
};
exports.handleLogout = handleLogout;
//* Google Auth*//
const oAuthHandler = (_, res) => {
    const REDIRECT_URI = "https://rental-ruby.vercel.app/user/oauthsuccess";
    // const REDIRECT_URI = "http://localhost:3000/user/oauthsuccess";
    const GOOGLE_OAUTH_SCOPES = [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ];
    // Prevent CSRF and more
    const state = "some_state";
    const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
    console.log(scopes);
    // Generate url from auth request
    // (A pattern, check docs)
    const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${config_1.GOOGLE_OAUTH_URL}?client_id=${config_1.GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
    // Redirect to concent page
    res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
};
exports.oAuthHandler = oAuthHandler;
const oAuth2Server = async (req, res, next) => {
    // Get code out of query (Authorization Code)
    // TODO: Maybe, validate state
    const { code } = req.query;
    const REDIRECT_URI = "http://localhost:3000/user/oauthsuccess";
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
                res.redirect("https://rental-ruby.vercel.app/");
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
            res.redirect("https://rental-ruby.vercel.app/");
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.oAuth2Server = oAuth2Server;
