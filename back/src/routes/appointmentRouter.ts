import { NextFunction, Request, Response, Router } from "express"
import { AppointmentScheduleDto } from "../dto/AppointmentDto"
import { cancelApponintmentController, getApponintmentByIdController, getApponintmentsController, registerApponintmentController } from "../controllers/appointmentController"
import { validateAppointmentRegisterData } from "../middlewares/appointmentMiddleware"

const appointmentRouter: Router = Router()

appointmentRouter.get("/", (req: Request, res: Response) => getApponintmentsController(req, res))

appointmentRouter.get("/:id", (req: Request<{id: number}>, res: Response) => getApponintmentByIdController(req, res))

appointmentRouter.post("/schedule", (req: Request, res: Response, next: NextFunction) => validateAppointmentRegisterData(req, res, next), (req: Request<unknown, unknown, AppointmentScheduleDto>, res: Response) => registerApponintmentController(req, res))

appointmentRouter.put("/cancel/:id", (req: Request<{id: number}>, res: Response) => cancelApponintmentController(req, res))


export default appointmentRouter