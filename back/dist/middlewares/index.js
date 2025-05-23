"use strict";
/*
import { RunningCodeInNewContextOptions } from "vm";
import { UserRegisterDTO } from "../dto/UserDto";

export const validateUresRegisterData = (req: Request, res: Response, next: NextFunction): void => {
    const campos: string[] = [ "birthdate", "email", "nDni", "name", "password", "username" ]
    const camposFiltered: string[] = campos.filter(campo => !req.body[campo])

    if(camposFiltered.length > 0){
        res.status(400).json({
            message: `Falta información para poder registrar al usuario: ${camposFiltered.join(", ")}`
        })
    } else next()
}

export const validateAppointmentRegisterData = (req: Request, res: Response, next: NextFunction): void => {
    const campos: string[] = [ "date", "time", "userId" ]
    const camposFiltered: string[] = campos.filter(campo => !req.body[campo])

    if(camposFiltered.length > 0){
        res.status(400).json({
            message: `Falta información para solicitar el turno: ${camposFiltered.join(", ")}`
        })import { NextFunction, Request, Response } from "express";
    } else next()
} */ 
