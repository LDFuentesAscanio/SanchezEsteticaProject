"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSourse = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
exports.AppDataSourse = new typeorm_1.DataSource({
    type: envs_1.DB_TYPE,
    host: envs_1.DB_HOST,
    port: envs_1.DB_PORT,
    username: envs_1.DB_USERNAME,
    password: envs_1.DB_PASSWORD,
    database: envs_1.DB_DATABASE,
    synchronize: envs_1.DB_SYNC,
    logging: envs_1.DB_LOGGING,
    entities: envs_1.DB_ENTITIES,
    dropSchema: envs_1.DB_DROP,
});
