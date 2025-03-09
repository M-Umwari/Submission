import { DataSource } from "typeorm";
import dotenv from 'dotenv'
import Note from "./entities/Note";
import User from "./entities/User";
import { DefaultTimeSlot } from "./entities/DefaultTimeSlot";
import { TimeSlot } from "./entities/TimeSlot";
import Group from "./entities/Group";
import Message from "./entities/Message";
import { Appointment } from "./entities/Appointment";
dotenv.config()


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT ? parseInt(process.env.port as string) : 5432,
    username:process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    synchronize: true,
    logging: true,
    entities: [Note, User, DefaultTimeSlot, TimeSlot, Group, Message, Appointment],
    subscribers: [],
    migrations: [],
})