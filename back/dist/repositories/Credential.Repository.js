"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialRepository = void 0;
const data_sourse_1 = require("../config/data.sourse");
const Credentials_entity_1 = require("../entities/Credentials.entity");
exports.CredentialRepository = data_sourse_1.AppDataSourse.getRepository(Credentials_entity_1.Credential);
