"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRepository = void 0;
const moment_1 = __importDefault(require("moment"));
const data_sourse_1 = require("../config/data.sourse");
const Appointment_entity_1 = require("../entities/Appointment.entity");
exports.AppointmentRepository = data_sourse_1.AppDataSourse.getRepository(Appointment_entity_1.Appointment).extend({
    validateAllowAppointment: function (date, time) {
        const appointmentDateTime = (0, moment_1.default)(`${date} ${time}`, "YYYY-MM-DD HH:mm");
        if (!appointmentDateTime.isValid()) {
            throw new Error("La fecha u hora proporcionada no es válida");
        }
        const now = (0, moment_1.default)();
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
    },
});
