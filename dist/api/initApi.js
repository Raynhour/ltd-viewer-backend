"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
const httpAxios_api_1 = require("./httpAxios.api");
const instance = new api_1.default(httpAxios_api_1.default);
Object.freeze(instance);
exports.default = instance;
//# sourceMappingURL=initApi.js.map