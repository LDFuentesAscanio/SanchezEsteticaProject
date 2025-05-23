"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAppointmentRegisterData = void 0;
const validateAppointmentRegisterData = (req, res, next) => {
    const campos = ["date", "time", "userId"];
    const camposFiltrados = campos.filter(campo => !req.body[campo]);
    if (camposFiltrados.length === 1) {
        res.status(400).json({
            message: `Falta información para crear la cita. Campo faltante: ${camposFiltrados.join("")}`
        });
    }
    else if (camposFiltrados.length > 1) {
        res.status(400).json({
            message: `Falta información para crear la cita. Campos faltantes: ${camposFiltrados.join(", ")}`
        });
    }
    else
        next();
};
exports.validateAppointmentRegisterData = validateAppointmentRegisterData;
