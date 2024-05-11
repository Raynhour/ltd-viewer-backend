"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ormconfig = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'viewer',
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`]
};
exports.default = ormconfig;
//# sourceMappingURL=ormconfig.js.map