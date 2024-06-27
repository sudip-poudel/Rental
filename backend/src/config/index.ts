const {
  JWT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  GOOGLE_ACCESS_TOKEN_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_OAUTH_URL,
  GMAIL_ID,
  GMAIL_PASS,
  FRONTEND_URL,
} = process.env as Record<string, string>;
const ENV: "DEV" | "PROD" = process.env.ENV as "DEV" | "PROD";
export {
  JWT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  GOOGLE_ACCESS_TOKEN_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  ENV,
  GOOGLE_OAUTH_URL,
  GMAIL_ID,
  FRONTEND_URL,
  GMAIL_PASS,
};
