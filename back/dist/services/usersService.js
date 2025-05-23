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
exports.loginUserService = exports.registerUserService = exports.getUserByIdService = exports.getUserService = void 0;
const data_sourse_1 = require("../config/data.sourse");
const User_entity_1 = require("../entities/User.entity");
const User_Repository_1 = require("../repositories/User.Repository");
const credentialServices_1 = require("./credentialServices");
const getUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_Repository_1.UserRepository.find();
    return users;
});
exports.getUserService = getUserService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield User_Repository_1.UserRepository.findOne({
        where: {
            id: parseInt(id, 10)
        },
        relations: ["appointments"]
    });
    if (!userFound)
        throw new Error(`El ususario con id ${id} no existe`);
    else
        return userFound;
});
exports.getUserByIdService = getUserByIdService;
const registerUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield data_sourse_1.AppDataSourse.transaction((entityManager) => __awaiter(void 0, void 0, void 0, function* () {
        const userCredentials = yield (0, credentialServices_1.createCredentialService)(entityManager, user.username, user.password);
        const newUser = entityManager.create(User_entity_1.User, {
            name: user.name,
            birthdate: user.birthdate,
            email: user.email,
            nDni: user.nDni,
            credentials: userCredentials
        });
        return yield entityManager.save(newUser);
    }));
    return result;
});
exports.registerUserService = registerUserService;
const loginUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const credentialId = yield (0, credentialServices_1.checkCredentials)(user.username, user.password);
    if (!credentialId) {
        throw new Error("Usuario o contraseña incorrectos.");
    }
    const userFound = yield User_Repository_1.UserRepository.findOne({
        where: {
            credentials: {
                id: credentialId,
            },
        },
    });
    if (!userFound) {
        throw new Error(`No se encontró un usuario asociado con las credenciales.`);
    }
    return {
        login: true,
        user: {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
            birthdate: userFound.birthdate,
            nDni: userFound.nDni,
        },
    };
});
exports.loginUserService = loginUserService;
