"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const data_sourse_1 = require("../config/data.sourse");
const User_entity_1 = require("../entities/User.entity");
exports.UserRepository = data_sourse_1.AppDataSourse.getRepository(User_entity_1.User);
