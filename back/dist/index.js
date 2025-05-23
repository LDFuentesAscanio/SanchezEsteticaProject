"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const envs_1 = require("./config/envs");
const data_sourse_1 = require("./config/data.sourse");
require("reflect-metadata");
data_sourse_1.AppDataSourse.initialize()
    .then(() => {
    console.log("Conexion a la base datos con exito");
    server_1.default.listen(envs_1.PORT, () => {
        console.log(`Servidor escuchando en el puerto ${envs_1.PORT}`);
    });
}).catch((error) => {
    console.log("Error al conectar con la base de datos:", error);
});
