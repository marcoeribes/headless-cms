import dotenv from "dotenv";
import * as ga from "./googleApi/google-api.js";
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyRawBody from "fastify-raw-body";
import { addTimeProperties, idGenerator } from "./service.js";
import Stripe from "stripe";

dotenv.config();

const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const DOMAIN = "http://localhost:5173";
const STRIPE_KEY = process.env.STRIPE_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: "http://localhost:5173",
});

await fastify.register(fastifyRawBody, {
  field: "rawBody",
  global: false,
  encoding: "utf8",
  runFirst: true,
  routes: [],
  jsonContentTypes: [],
});

const stripe = new Stripe(STRIPE_KEY);

fastify.get("/api/getEvents", async (req, res) => {
  try {
    const result = await ga.getSheetEvents();
    addTimeProperties(result);
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
  try {
    const { registration, event } = req.body;
    const priceInCents = Math.round(
      Number(event.price.replace(/[$,]/g, "")) * 100
    );

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: event.title,
              description: event.description,
              images: event.imageUrl ? [event.imageUrl] : [],
              metadata: {
                id: event.id,
                location: event.location,
                startDate: event.startDate,
                endDate: event.endDate,
              },
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${DOMAIN}/payment-status?success=true`,
      cancel_url: `${DOMAIN}/payment-status?canceled=true`,

      metadata: {
        eventId: event.id,
        option: registration.option,
        firstName: registration.firstName,
        middleInitial: registration.middleInitial,
        lastName: registration.lastName,
        dob: registration.dob,
        phone: registration.phone,
        email: registration.email,
        dlNumber: registration.dlNumber,
        caseNumber: registration.caseNumber,
      },
    });

    res.code(200).send({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    res.code(500).send({ error: "Failed to create checkout session" });
  }
});

fastify.route({
  method: "POST",
  url: "/api/stripe-webhook",
  config: {
    rawBody: true,
  },
  handler: async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return res.code(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("✅ Webhook verified successfully:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("💰 Payment successful for session:", session.id);

      try {
        const fullSession = await stripe.checkout.sessions.retrieve(
          session.id,
          {
            expand: ["line_items", "customer"],
          }
        );

        const registrationData = {
          customerId: idGenerator(),
          eventId: session.metadata.eventId,
          firstName: session.metadata.firstName,
          middleInitial: session.metadata?.middleInitial,
          lastName: session.metadata.lastName,
          dob: session.metadata.dob,
          phone: session.metadata.phone,
          email: session.metadata.email,
          dlNumber: session.metadata.dlNumber,
          caseNumber: session.metadata.caseNumber,
          option: session.metadata.option,
          stripeSessionId: session.id,
        };

        await ga.saveToSheet(registrationData);
        console.log("✅ Registration saved to Google Sheets!");
      } catch (err) {
        console.error("❌ Failed to save registration:", err);
      }
    }

    res.code(200).send({ received: true });
  },
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
