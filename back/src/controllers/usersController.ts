import { Request, Response } from "express"
import { getUserByIdService, getUserService, loginUserService, registerUserService } from "../services/usersService"
import { UserLoginDTO, UserLoginSuccesDTO, UserRegisterDTO } from "../dto/UserDto"
import { IPostgresError } from "../interfaces/IErrorInterface"

export const getUsersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await getUserService()
        res.status(200).json({
            message: "Listado de todos los usuarios",
            data: response
        })
    } catch (error) {
        res.status(400).json({
            message: "Datos incorrectos",
            data: error instanceof Error ? error.message : `Error desconocido`
        })
    }
}

export const getUserByIdController = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const{ id } = req.params
    
    try {
        const response = await getUserByIdService(id)
        res.status(200).json({
            message: `Se obtuvo la informacion del usuario con id: ${id}`,
            data: response,
        })
    } catch (error) {
        res.status(404).json({
            message: "El usuario no fue encontrado",
            data: error instanceof Error ? error.message : `Error desconocido`
        })
    }
}

export const registerUserController = async (req: Request<unknown, unknown, UserRegisterDTO>, res: Response): Promise<void> => {
    try {
        await registerUserService(req.body)
        res.status(201).json({
            message: "Usuario registrado con exito",
        })
    } catch (error) {
        const postgresError = error as IPostgresError
        
        res.status(400).json({
            message: "Datos incorrectos",
            data: postgresError instanceof Error ? postgresError.detail ? postgresError.detail : postgresError.message : "Error desconocido"
        })
    }
}

export const loginUserController = async (req: Request<unknown, unknown, UserLoginDTO>, res: Response): Promise<void> => {
    try {
        const response: UserLoginSuccesDTO = await loginUserService(req.body)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({
            message: "Usuario o contraseña incorrectos",
            data: error instanceof Error ? error.message : `Error desconocido`
        })
    }
}