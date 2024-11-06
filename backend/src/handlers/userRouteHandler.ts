import { NextFunction, Request, Response } from "express";
import { db } from "../db";
import { users } from "../schema/schema";
import { eq } from "drizzle-orm";
import { generateToken } from "../helper/generateToken";
import {
  BACKEND_URL,
  ENV,
  FRONTEND_URL,
  GMAIL_ID,
  GMAIL_PASS,
  GOOGLE_ACCESS_TOKEN_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_OAUTH_URL,
} from "../config";
import { loginHelper } from "../helper/loginHelper";
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
import jwt, { JwtPayload } from "jsonwebtoken";
import { UploadApiResponse } from "cloudinary";
import { handleAvatarImageUpload } from "../helper/handleCloudinaryUpload";

//** Auth Routes */
const handleSignup = async (req: Request, res: Response) => {
  const {
    email,
    password,
    name,
  }: { email: string; password: string; name: string } = req.body;
  console.log(email, password, name);
  if (!email || !password) {
    return res
      .status(400)
      .send({ success: false, message: "Username and password are required" });
  }
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (user) {
      return res
        .status(400)
        .send({ success: false, message: "User already exists" });
    }
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const data = await db
      .insert(users)
      .values({ email: email, password: hashedPassword, name: name })
      .returning({ id: users.id, name: users.name, email: users.email });
    const id = { id: data[0].id };
    const userData = {
      id: data[0].id,
      name: data[0].name,
      email: data[0].email,
    };
    const token = generateToken(id);
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
  } catch (error) {
    return res.status(404).send("Internal server error");
  }
};

const handleLogin = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  console.log(req.body);

  if (!email || !password) {
    return res
      .status(400)
      .send({ success: false, messege: "Username and password are required" });
  }
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
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
    const isValid: boolean = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid password" });
    }
    const token = generateToken({ id: user.id });
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
  } catch (error) {
    console.error(error);
  }
};

const handleLogout = async (req: Request, res: Response) => {
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

//* Google Auth*//

export const oAuthHandler = (_: Request, res: Response) => {
  const REDIRECT_URI = `${BACKEND_URL}/user/oauthsuccess`;
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
  const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&access_type=offline&response_type=code&scope=${scopes}`;
  console.log(GOOGLE_OAUTH_CONSENT_SCREEN_URL);

  // Redirect to concent page
  res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
};

export const oAuth2Server = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get code out of query (Authorization Code)
  // TODO: Maybe, validate state
  const { code } = req.query;

  // const REDIRECT_URI = "http://localhost:3000/user/oauthsuccess";
  const REDIRECT_URI = `${BACKEND_URL}/user/oauthsuccess`;
  // ENV === "PROD"
  //   ? "https://rental-backend-five.vercel.app/user/oauthsuccess"
  //   : "http://localhost:3000/user/oauthsuccess";

  // Ask for Access Token
  const data = {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
  };

  // Exchange authorization code for access token & id_token
  const response = await fetch(GOOGLE_ACCESS_TOKEN_URL as string, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const access_token_data = await response.json();
  console.log(access_token_data);

  const { id_token } = access_token_data;

  // verify and extract the information in the id token
  const token_info_response = await fetch(
    `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
  );

  // TODO: TYPE
  const token_info_response_json = await token_info_response.json();
  console.log(token_info_response_json);

  const { name, email } = token_info_response_json;
  console.log(name, email);
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
      columns: {
        id: true,
        email: true,
        name: true,
      },
    });
    if (user) {
      const resp = loginHelper(user, res);
      if (resp.success) {
        // res.redirect("http://localhost:5173");
        res.redirect(`${FRONTEND_URL}`);
      }
    }
    //it there is no user with the email, create a new user
    const data = await db
      .insert(users)
      .values({ email: email, name: name })
      .returning({ id: users.id, name: users.name, email: users.email });
    const resp = loginHelper(data[0], res);
    if (resp.success) {
      // res.redirect("http://localhost:5173")
      res.redirect(`${FRONTEND_URL}`);
    }
  } catch (error) {
    console.log(error);
  }
};

//forgetpassword handler
const handleForgetPassword = async (req: Request, res: Response) => {
  const { email }: { email: string } = req.body;
  if (!email) {
    return res
      .status(400)
      .send({ success: false, message: "Email is required" });
  }
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User not found" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "15m",
    });
    //insert the token in user table to check its validity
    await db
      .update(users)
      .set({ resetPasswordToken: token })
      .where(eq(users.id, user.id));

    //send email to the user with a link to reset password
    const resetURL = `${BACKEND_URL}/user/updatepassword/${token}`;
    //create tranponder for nodemailer
    const transponder = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,

      auth: {
        user: GMAIL_ID,
        pass: GMAIL_PASS,
      },
    });
    const mailOptions = {
      from: GMAIL_ID,
      to: email,
      subject: "Password Reset",
      text: `Click on the link to reset your password ${resetURL}`,
    };

    //send email

    await transponder.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.log(error);
      }
      console.log("Email sent: " + info.response);
      res.send(201).json({ success: true, message: "Email sent" });
    });
  } catch (error) {
    console.error(error);
  }
};

const verifyUpdatePassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  if (!token) {
    return res.redirect(`${FRONTEND_URL}/signin`);
  }
  console.log(token);

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    console.log(decoded, "fasdfasd");

    if (!decoded) {
      return res.redirect(`${FRONTEND_URL}/signin`);
    }
    const userId = decoded.id;

    const resetToken = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        resetPasswordToken: true,
        email: true,
      },
    });
    console.log(resetToken, typeof resetToken);

    if (resetToken?.resetPasswordToken !== null && resetToken) {
      const tkn: string = resetToken.resetPasswordToken as string;
      console.log(tkn);

      if (tkn == token) {
        return res.redirect(
          `${FRONTEND_URL}/updatepassword?token=${token}&email=${resetToken.email}`
        );
      }
      res.redirect(`${FRONTEND_URL}/fdkfjalksdjflkjsdlfkjsdljf`);
    }
    return res.redirect(`${FRONTEND_URL}/signin`);
  } catch (error) {
    console.error(error);
  }
};

const updatePasswordHandler = async (req: Request, res: Response) => {
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
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (!decoded) {
      return res.status(400).send({ success: false, message: "Invalid token" });
    }
    const resetUrl = await db.query.users.findFirst({
      where: eq(users.id, decoded.id),
      columns: {
        resetPasswordToken: true,
      },
    });
    if (resetUrl?.resetPasswordToken !== token) {
      return res.status(400).send({ success: false, message: "Invalid token" });
    }
    const userId = decoded.id;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .update(users)
      .set({ password: hashedPassword, resetPasswordToken: null })
      .where(eq(users.id, userId));
    res
      .status(200)
      .send({ success: true, message: "Password updated successfully" });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(400).send({ success: false, message: "Token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).send({ success: false, message: "Invalid token" });
    } else if (error instanceof jwt.NotBeforeError) {
      return res
        .status(400)
        .send({ success: false, message: "Token not active" });
    }

    console.error(error);
  }
};

/**UPDATE USER DETAILS */
const handleUpdateUserAvater = async (req: Request, res: Response) => {
  const photo = req.file as Express.Multer.File;
  const userId = req.params.userId;
  console.log(photo, "photos");
  if (!photo) {
    return res
      .status(400)
      .send({ success: false, message: "No image uploaded" });
  }

  try {
    const b64 = Buffer.from(photo.buffer as Buffer).toString("base64");
    let dataURI = (("data:" + photo.mimetype) as string) + ";base64," + b64;
    const cldRes: UploadApiResponse = await handleAvatarImageUpload(dataURI);
    const avatarUrl = cldRes.secure_url;

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User not found" });
    }
    await db
      .update(users)
      .set({ profileUrl: avatarUrl })
      .where(eq(users.id, userId));
    res.status(200).send({ success: true, message: "Profile picture updated" });
  } catch (error) {
    res.status(400).send({ success: false, message: "Internal server error" });
  }
};

/** User Routes */
const getCurrentUser = async (req: Request, res: Response) => {
  const id = req.params.userId;
  console.log(id);
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
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
  } catch (error) {
    console.error(error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
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
  } catch (error) {
    console.error(error);
  }
};

export {
  handleSignup,
  handleLogin,
  handleLogout,
  handleForgetPassword,
  verifyUpdatePassword,
  updatePasswordHandler,
  handleUpdateUserAvater,
  getUserById,
  getCurrentUser,
};
