import dotenv from "dotenv";
import * as ga from "./googleApi/google-api.js";
import Fastify from "fastify";
import cors from '@fastify/cors'
import { addTimeProperties } from "./service.js";

dotenv.config();

const fastify = Fastify({
  logger: true
})

await fastify.register(cors, {
  origin: 'http://localhost:5173'
})

fastify.get('/api/getEvents', async (req, res) => {
  try {
    const result = await ga.getSheetEvents();
    const formattedData = addTimeProperties(result);
    console.log("formatedd", formattedData);
    return { success: true, data: result };
  } catch (error) {
    req.log.error(error);
    res.code(500).send({ success: false, message: 'Failed to fetch sheets data' });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start();