import fs from "fs";
import { google } from "googleapis";
import { JWT } from "google-auth-library";

const KEYS = JSON.parse(fs.readFileSync("google-application-credentials.json", "utf8"));
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/calendar"];

const authClient = new JWT({
  email: KEYS.client_email,
  key: KEYS.private_key,
  scopes: SCOPES,
});

export const auth = new google.auth.GoogleAuth({authClient});