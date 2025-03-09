import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm"
import User from "./User"
import Message from "./Message"


@Entity()
class Group {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "text" })
    name: string

    @ManyToMany(() => User, (user) => user.groups)
    users: User[]

    @OneToMany(() => Message, (message) => message.group)
    messages: Message[]
}

export default Group