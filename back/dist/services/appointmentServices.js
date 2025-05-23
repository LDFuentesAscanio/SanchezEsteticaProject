"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentServices = exports.scheduleAppointmentServices = exports.getAppointmentByIdServices = exports.getAppointmentsServices = void 0;
const data_sourse_1 = require("../config/data.sourse");
const IAppointmentInterface_1 = require("../interfaces/IAppointmentInterface");
const Appointment_Repository_1 = require("../repositories/Appointment.Repository");
const User_Repository_1 = require("../repositories/User.Repository");
const getAppointmentsServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield Appointment_Repository_1.AppointmentRepository.find({ relations: {
            user: true
        } });
    if (!appointments || appointments.length === 0) {
        throw new Error("No existen citas");
    }
    return appointments.map(appointment => ({
        id: appointment.id,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        userId: appointment.user.id,
    }));
});
exports.getAppointmentsServices = getAppointmentsServices;
const getAppointmentByIdServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentWanted = yield Appointment_Repository_1.AppointmentRepository.findOne({ where: { id }, relations: ["user"] });
    if (!appointmentWanted) {
        throw new Error(`No se pudo encontrar la cita con id: ${id}`);
    }
    const appointmentDTO = {
        id: appointmentWanted.id,
        date: appointmentWanted.date,
        time: appointmentWanted.time,
        status: appointmentWanted.status,
        userId: appointmentWanted.user.id,
    };
    return appointmentDTO;
});
exports.getAppointmentByIdServices = getAppointmentByIdServices;
const scheduleAppointmentServices = (appointmentData) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = data_sourse_1.AppDataSourse.createQueryRunner();
    yield queryRunner.connect();
    try {
        yield queryRunner.startTransaction();
        // Valida la fecha y hora
        Appointment_Repository_1.AppointmentRepository.validateAllowAppointment(appointmentData.date, appointmentData.time);
        if (!appointmentData.userId) {
            throw new Error("El ID de usuario es obligatorio para crear una cita.");
        }
        const user = yield User_Repository_1.UserRepository.findOneBy({ id: appointmentData.userId });
        if (!user) {
            throw new Error("El usuario con el ID especificado no existe.");
        }
        const newAppointment = Appointment_Repository_1.AppointmentRepository.create({
            date: appointmentData.date,
            time: appointmentData.time,
            user: user,
        });
        newAppointment.user = user;
        newAppointment.status = IAppointmentInterface_1.Status.active;
        const savedAppointment = yield queryRunner.manager.save(newAppointment);
        yield queryRunner.commitTransaction();
        return {
            id: savedAppointment.id,
            date: savedAppointment.date,
            time: savedAppointment.time,
            status: savedAppointment.status,
            userId: savedAppointment.user.id,
        };
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        throw new Error(`${error}`);
    }
    finally {
        yield queryRunner.release();
    }
});
exports.scheduleAppointmentServices = scheduleAppointmentServices;
const cancelAppointmentServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment = yield Appointment_Repository_1.AppointmentRepository.findOneBy({ id });
    if (!appointment) {
        throw new Error("Cita no encontrado");
    }
    const result = yield Appointment_Repository_1.AppointmentRepository.update({ id }, { status: IAppointmentInterface_1.Status.cancelled });
    if (result.affected === 0) {
        throw new Error("No se pudo actualizar el estado de la cita");
    }
});
exports.cancelAppointmentServices = cancelAppointmentServices;
