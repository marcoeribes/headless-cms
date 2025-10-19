import dotenv from "dotenv";
import * as ga from "./googleApi/google-api.js";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { addTimeProperties, idGenerator } from "./service.js";

dotenv.config();

const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const DOMAIN = "http://localhost:5173";
const STRIPE_KEY = process.env.STRIPE_KEY;

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: "http://localhost:5173",
});

const stripe = new Stripe(STRIPE_KEY);

fastify.get("/api/getEvents", async (req, res) => {
  try {
    const result = await ga.getSheetEvents();
    const formattedData = addTimeProperties(result);
    console.log("formatedd", formattedData);
    return { success: true, data: result };
  } catch (error) {
    req.log.error(error);
    res
      .code(500)
      .send({ success: false, message: "Failed to fetch sheets data" });
  }
});

fastify.post("/api/postRegistration", async (req, res) => {
  try {
    const formattedData = idGenerator(req.body);
    const result = await ga.saveToSheet(formattedData);
    console.log("request body: ", req.body);
    return { success: true, data: result };
  } catch (error) {
    req.log.error(error);
    res
      .code(500)
      .send({ success: false, message: "Failed to post data to sheets" });
  }
});

fastify.post("/api/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Premium Item",
          },
          unit_amount: 1999, // price in cents = $199.99
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${DOMAIN}?success=true`,
    cancel_url: `${DOMAIN}?canceled=true`,
  });

  //res.code(303).redirect(session.url);
  res.code(200).send({ url: session.url });
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
