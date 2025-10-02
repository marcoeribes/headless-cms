import dotenv from "dotenv";
import * as ga from "./google-api.js";

dotenv.config();
await ga.listCalendarEvents();

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

ga.saveToGoogleSheet(exampleData).catch(console.error);

