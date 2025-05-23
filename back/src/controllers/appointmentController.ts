import { Request, Response } from "express";
import { AppointmentScheduleDto } from "../dto/AppointmentDto";
import { cancelAppointmentServices, getAppointmentByIdServices, getAppointmentsServices, scheduleAppointmentServices, } from "../services/appointmentServices";
import { IPostgresError } from "../interfaces/IErrorInterface";

export const getApponintmentsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await getAppointmentsServices()
        res.status(200).json({
            message: "Citas agendadas hasta el momento",
            data: response
        })
    } catch (error) {
        res.status(404).json({
            message: "No se encuentran citas agendadas",
            data: error instanceof Error ? error.message : `Error desconocido`
        })        
    }
}

export const getApponintmentByIdController = async (req: Request<{id: number}>, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const response = await getAppointmentByIdServices(id)
        res.status(200).json({
            message: `Se muestra la informacion de la cita numero ${id}`,
            data: response 
        })
    } catch (error) {
        res.status(404).json({
            message: "La cita que solicita no se encuentra",
            data: error instanceof Error ? error.message : `Error desconocido`
        })
    }
    
}

export const registerApponintmentController = async (req: Request<unknown, unknown, AppointmentScheduleDto>, res: Response): Promise<void> => {
    try {
        const response = await scheduleAppointmentServices(req.body)
        res.status(201).json({
            message: "Se ha agendado la cita con éxito",
            data: response
        })
    } catch (error) {
        const err = error as IPostgresError
        res.status(400).json({
            message: "Se ha ingresado datos erróneos",
            data: err instanceof Error ? err.detail ? err.detail : err.message : `Error desconocido`
        })
    }
}

export const cancelApponintmentController = async (req: Request<{id: number}>, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const response = await cancelAppointmentServices(id)
        res.status(200).json({
            message: "Se ha cancelado la cita con id: " + id,
            data: response
        })
    } catch (error) {
        res.status(404).json({
            message: "No se encuentra la cita que quiere cancelar",
            data: error instanceof Error ? error.message : `Error desconocido`
        })
    }
}