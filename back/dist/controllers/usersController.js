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
exports.loginUserController = exports.registerUserController = exports.getUserByIdController = exports.getUsersController = void 0;
const usersService_1 = require("../services/usersService");
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, usersService_1.getUserService)();
        res.status(200).json({
            message: "Listado de todos los usuarios",
            data: response
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Datos incorrectos",
            data: error instanceof Error ? error.message : `Error desconocido`
        });
    }
});
exports.getUsersController = getUsersController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield (0, usersService_1.getUserByIdService)(id);
        res.status(200).json({
            message: `Se obtuvo la informacion del usuario con id: ${id}`,
            data: response,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "El usuario no fue encontrado",
            data: error instanceof Error ? error.message : `Error desconocido`
        });
    }
});
exports.getUserByIdController = getUserByIdController;
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, usersService_1.registerUserService)(req.body);
        res.status(201).json({
            message: "Usuario registrado con exito",
        });
    }
    catch (error) {
        const postgresError = error;
        res.status(400).json({
            message: "Datos incorrectos",
            data: postgresError instanceof Error ? postgresError.detail ? postgresError.detail : postgresError.message : "Error desconocido"
        });
    }
});
exports.registerUserController = registerUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, usersService_1.loginUserService)(req.body);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({
            message: "Usuario o contraseña incorrectos",
            data: error instanceof Error ? error.message : `Error desconocido`
        });
    }
});
exports.loginUserController = loginUserController;
