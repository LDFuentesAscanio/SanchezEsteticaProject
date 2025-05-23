import { NextFunction, Request, Response, Router } from "express"
import { getUserByIdController, getUsersController, loginUserController, registerUserController } from "../controllers/usersController"
import { UserLoginDTO, UserRegisterDTO } from "../dto/UserDto"
import { validateUserRegisterData } from "../middlewares/userMiddleware"

const userRouter: Router = Router()

userRouter.get("/", (req: Request, res: Response) => getUsersController(req, res))

userRouter.post("/register", (req: Request, res: Response, next: NextFunction) => validateUserRegisterData(req, res, next), (req: Request<unknown, unknown, UserRegisterDTO>, res: Response) => registerUserController(req, res))
, 
userRouter.post("/login", (req: Request<unknown, unknown, UserLoginDTO>, res: Response) => loginUserController(req, res))

userRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => getUserByIdController(req, res))

export default userRouter