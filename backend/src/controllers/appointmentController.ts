import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Appointment } from "../entities/Appointment";
import { TimeSlot } from "../entities/TimeSlot";
import User from "../entities/User";


const appointmentRepository = AppDataSource.getRepository(Appointment);
const timeSlotRepository = AppDataSource.getRepository(TimeSlot);
const userRepository = AppDataSource.getRepository(User);


class AppointmentController {
  static async createAppointment(req: Request, res: Response) {
    const userId = req.user.id
    try {
      const { timeSlotId } = req.body;

      const user = await userRepository.findOne({ where: { id: userId } });

      const timeSlot = await timeSlotRepository.findOne({ where: { id: timeSlotId } })
      if (!timeSlot) return res.status(404).json({ message: "Time slot not found" })

      const bookedAppointment = await timeSlotRepository.findOne({
        where: { id: timeSlotId, isAvailable: false },
      });

      if (bookedAppointment) {
        return res.status(400).json({ message: "Time slot already booked" });
      }

      const appointment = new Appointment();
      appointment.user = user;
      appointment.timeSlot = timeSlot;
      timeSlot.isAvailable = false

      await timeSlotRepository.save(timeSlot)
      await appointmentRepository.save(appointment);

      return res.status(201).json(appointment);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async cancelAppointment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const appointment = await appointmentRepository.findOne({
        where:{
          timeSlot:{id:id}
        }, 
        relations:["timeSlot"]
      });

      if (!appointment) return res.status(404).json({ message: "Appointment not found" });

      const timeSlot = await timeSlotRepository.findOneBy({id: appointment.timeSlot.id})
      timeSlot.isAvailable = true

      await appointmentRepository.remove(appointment)
      await timeSlotRepository.save(timeSlot)

      return res.status(200).json({message:'Cancellation successful'});
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AppointmentController;