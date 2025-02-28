import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./User";
import { TimeSlot } from "./TimeSlot";


@Entity()
export class Appointment {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => User, (user) => user.appointments)
    user: User

    @OneToOne(() => TimeSlot, (slot) => slot.appointment)
    timeSlot: TimeSlot

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}