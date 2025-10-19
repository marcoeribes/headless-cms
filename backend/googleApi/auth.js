import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import { JWT } from "google-auth-library";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correctly resolve path to credentials in the same directory
const credentialsPath = path.join(__dirname, "google-application-credentials.json");

const KEYS = JSON.parse(fs.readFileSync(credentialsPath , "utf8"));
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/calendar"];

const authClient = new JWT({
  email: KEYS.client_email,
  key: KEYS.private_key,
  scopes: SCOPES,
});

export const auth = new google.auth.GoogleAuth({authClient});