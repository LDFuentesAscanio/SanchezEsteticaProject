"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const userMiddleware_1 = require("../middlewares/userMiddleware");
const userRouter = (0, express_1.Router)();
userRouter.get("/", (req, res) => (0, usersController_1.getUsersController)(req, res));
userRouter.post("/register", (req, res, next) => (0, userMiddleware_1.validateUserRegisterData)(req, res, next), (req, res) => (0, usersController_1.registerUserController)(req, res))
    ,
        userRouter.post("/login", (req, res) => (0, usersController_1.loginUserController)(req, res));
userRouter.get("/:id", (req, res) => (0, usersController_1.getUserByIdController)(req, res));
exports.default = userRouter;
