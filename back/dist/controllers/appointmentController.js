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
exports.cancelApponintmentController = exports.registerApponintmentController = exports.getApponintmentByIdController = exports.getApponintmentsController = void 0;
const appointmentServices_1 = require("../services/appointmentServices");
const getApponintmentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, appointmentServices_1.getAppointmentsServices)();
        res.status(200).json({
            message: "Citas agendadas hasta el momento",
            data: response
        });
    }
    catch (error) {
        res.status(404).json({
            message: "No se encuentran citas agendadas",
            data: error instanceof Error ? error.message : `Error desconocido`
        });
    }
});
exports.getApponintmentsController = getApponintmentsController;
const getApponintmentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield (0, appointmentServices_1.getAppointmentByIdServices)(id);
        res.status(200).json({
            message: `Se muestra la informacion de la cita numero ${id}`,
            data: response
        });
    }
    catch (error) {
        res.status(404).json({
            message: "La cita que solicita no se encuentra",
            data: error instanceof Error ? error.message : `Error desconocido`
        });
    }
});
exports.getApponintmentByIdController = getApponintmentByIdController;
const registerApponintmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, appointmentServices_1.scheduleAppointmentServices)(req.body);
        res.status(201).json({
            message: "Se ha agendado la cita con éxito",
            data: response
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: "Se ha ingresado datos erróneos",
            data: err instanceof Error ? err.detail ? err.detail : err.message : `Error desconocido`
        });
    }
});
exports.registerApponintmentController = registerApponintmentController;
const cancelApponintmentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield (0, appointmentServices_1.cancelAppointmentServices)(id);
        res.status(200).json({
            message: "Se ha cancelado la cita con id: " + id,
            data: response
        });
    }
    catch (error) {
        res.status(404).json({
            message: "No se encuentra la cita que quiere cancelar",
            data: error instanceof Error ? error.message : `Error desconocido`
        });
    }
});
exports.cancelApponintmentController = cancelApponintmentController;
