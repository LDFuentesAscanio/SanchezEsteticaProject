import { NextFunction, Request, Response } from "express";

export const validateAppointmentRegisterData = (req: Request, res: Response, next: NextFunction): void => {
    const campos: string[] = ["date", "time", "userId"]

    const camposFiltrados: string[] = campos.filter(campo => !req.body[campo]);
    
    if (camposFiltrados.length === 1) {
        res.status(400).json({
            message: `Falta información para crear la cita. Campo faltante: ${camposFiltrados.join("")}`
        })
    } else if (camposFiltrados.length > 1) {
        res.status(400).json({
            message: `Falta información para crear la cita. Campos faltantes: ${camposFiltrados.join(", ")}`
        })
    } else next()
}