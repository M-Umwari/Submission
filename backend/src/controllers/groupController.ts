import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import Group from "../entities/Group";
import User from "../entities/User";

const groupRepository = AppDataSource.getRepository(Group);
const userRepository = AppDataSource.getRepository(User);

export class GroupController {
    static async createGroup(req: Request, res: Response) {
        try {
            const { name } = req.body

            if(!name){
                return res.status(400).json({message:'Validation error'})
            }

            const existingGroup = await groupRepository.findOne({ where: { name } })
            if (existingGroup) {
                return res.status(400).json({ message: "Group already exists" })
            }

            const group = groupRepository.create({ name })
            await groupRepository.save(group);

            const newGroup = await groupRepository.findOne({
                where: { id: group.id },
                relations: ["users"],
            });

            return res.status(201).json(newGroup)
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async getGroups(req: Request, res: Response) {
        try{
            const groups = await groupRepository.find({relations:["users"]})
            return res.json(groups)
        }catch(err){
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async joinGroup(req: Request, res: Response) {
        try {
            const userId = req.user.id
            const { groupId } = req.body

            const user = await userRepository.findOne({ where: { id: userId }, relations: ["groups"] });
            const group = await groupRepository.findOne({ where: { id: groupId }, relations: ["users"] })

            if (!group) return res.status(404).json({ message: "Group not found" });

            if (group.users.some(existingUser => existingUser.id === userId)) {
                return res.status(400).json({ message: "User is already in the group" });
            }

            group.users.push(user)
            await groupRepository.save(group)

            return res.status(200).json(group)
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async leaveGroup(req: Request, res: Response) {
        try {
            const userId = req.user.id
            const { groupId } = req.body;

            const group = await groupRepository.findOne({ where: { id: groupId }, relations: ["users"] })

            if (!group) return res.status(404).json({ message: "Group not found" })

            group.users = group.users.filter(existingUser => existingUser.id !== userId);
            await groupRepository.save(group)

            return res.status(200).json(group)
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
