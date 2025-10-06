import dotenv from "dotenv";
import * as ga from "./googleApi/google-api.js";
import Fastify from "fastify";
import cors from '@fastify/cors'

dotenv.config();

const fastify = Fastify({
  logger: true
})

await fastify.register(cors, {
  origin: 'http://localhost:3000'
})

fastify.get('/api/getEvents', async (req, res) => {
  try {
    const calendar = await ga.getSheetEvents();
    return { success: true, data: calendar };
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