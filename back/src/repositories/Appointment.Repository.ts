import moment from "moment";
import { AppDataSourse } from "../config/data.sourse";
import { Appointment } from "../entities/Appointment.entity";
import { Status } from "../interfaces/IAppointmentInterface";

export const AppointmentRepository = AppDataSourse.getRepository(Appointment).extend({
    validateAllowAppointment: async function (date: Date, time: string, userId: number): Promise<void> {
        const appointmentDateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");

        if (!appointmentDateTime.isValid()) {
            throw new Error("La fecha u hora proporcionada no es válida");
        }

        const now = moment();
        if (appointmentDateTime.isBefore(now)) {
            throw new Error("No se pueden agendar citas en fechas pasadas");
        }

        const diffInHours = appointmentDateTime.diff(now, "hours");
        if (diffInHours < 24) {
            throw new Error("No se pueden agendar citas con menos de 24 horas de antelación");
        }

        const dayOfWeek = appointmentDateTime.day();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            throw new Error("No se pueden agendar citas los fines de semana");
        }

        const hour = appointmentDateTime.hour();
        const minute = appointmentDateTime.minute();
        if (hour < 8 || (hour === 18 && minute > 0) || hour > 18) {
            throw new Error("No se pueden agendar citas fuera del horario de 8:00 a 18:00");
        }

        // Nueva validación: evitar citas duplicadas para un usuario en la misma fecha y hora
        const existingAppointment = await this.findOne({
            where: {
                date,
                time,
                user: { id: userId },
                status: Status.active
            },
            relations: ["user"],
        });

        if (existingAppointment) {
            throw new Error("El usuario ya tiene una cita reservada en esta fecha y hora.");
        }
    },
});
