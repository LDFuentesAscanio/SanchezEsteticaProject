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
exports.validateUserRegisterData = void 0;
const User_Repository_1 = require("../repositories/User.Repository");
const Credential_Repository_1 = require("../repositories/Credential.Repository");
const validateUserRegisterData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const campos = ["birthdate", "email", "nDni", "name", "password", "username"];
    const camposFiltrados = campos.filter(campo => !req.body[campo]);
    if (camposFiltrados.length === 1) {
        res.status(400).json({
            message: `Falta información para registrar usuario. Campo faltante: ${camposFiltrados.join("")}`
        });
        return;
    }
    else if (camposFiltrados.length > 1) {
        res.status(400).json({
            message: `Falta información para registrar usuario. Campos faltantes: ${camposFiltrados.join(", ")}`
        });
        return;
    }
    try {
        const existingUserByUsername = yield Credential_Repository_1.CredentialRepository.findOne({
            where: { username: req.body.username }
        });
        if (existingUserByUsername) {
            res.status(400).json({ message: 'El nombre de usuario ya está en uso.' });
            return;
        }
        const existingUserByEmail = yield User_Repository_1.UserRepository.findOne({
            where: { email: req.body.email }
        });
        if (existingUserByEmail) {
            res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
            return;
        }
        const existingUserByDni = yield User_Repository_1.UserRepository.findOne({
            where: { nDni: req.body.nDni }
        });
        if (existingUserByDni) {
            res.status(400).json({ message: 'El número de DNI ya está registrado.' });
            return;
        }
        next();
    }
    catch (error) {
        console.error("Error al verificar los datos del usuario:", error);
        res.status(500).json({ message: 'Hubo un error al verificar los datos del usuario.' });
    }
});
exports.validateUserRegisterData = validateUserRegisterData;
