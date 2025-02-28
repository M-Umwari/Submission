import { AppDataSource } from './data-source'
import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import routes from './routes/index'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './documentation/swaggerConfig'
import cors from 'cors'
import cron from 'node-cron'
import { autoCreateTimeSlots } from './helpers/autoCreateTimeSlots';
import http from 'http';
import {Server} from 'socket.io';
dotenv.config();


const app = express();
app.use(cors())
app.use(express.json());

//@ts-ignore
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', socket => {
  console.log(`[${socket.id}] socket connected`);
  socket.on('disconnect', reason => {
    console.log(`[${socket.id}] socket disconnected - ${reason}`);
  });
});

const appPort = process.env.PORT || 3000;

app.use("/api", routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


AppDataSource.initialize()
  .then(() => {
    server.listen(appPort, () => {
      console.log("Server started at " + appPort);
    });
    console.log("Connection to DB successful!");

    cron.schedule("*/5 * * * *", autoCreateTimeSlots)
  })
  .catch((error) => console.log(error));


export default io