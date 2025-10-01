import { google } from "googleapis";
import fs from "fs";
import dotenv from "dotenv";
import { JWT } from "google-auth-library";

dotenv.config();

const keys = JSON.parse(fs.readFileSync("google-application-credentials.json", "utf8"));

const authClient = new JWT({
  email: keys.client_email,
  key: keys.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const auth = new google.auth.GoogleAuth({authClient});

async function saveToGoogleSheet(data) {
  const sheets = google.sheets({ version: "v4", auth });

  const values = data.map((item) => [
    item.firstName,
    item.lastName,
    item.email,
    item.phone,
    item.plan,
    item.premium_amount,
    item.start_policy_date,
    item.end_policy_date,
  ]);

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A2", // Adjust based on your sheet structure
    valueInputOption: "RAW",
    requestBody: { values },
  });

  console.log("Data saved successfully!");
}

const exampleData = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    plan: "Gold Plan",
    premium_amount: 50000,
    start_policy_date: "2025-01-01",
    end_policy_date: "2026-01-01",
  },
];

console.log("hey!");

saveToGoogleSheet(exampleData).catch(console.error);