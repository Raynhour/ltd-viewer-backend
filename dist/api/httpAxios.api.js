"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const qs_1 = require("qs");
class HttpAxios {
    constructor(URL, config) {
        this.URL = URL;
        this.config = config;
    }
    request() {
        const config = { ...this.config };
        config.paramsSerializer = (params) => qs_1.default.stringify(params, { arrayFormat: 'repeat', indices: false });
        return axios_1.default
            .request({
            url: this.URL,
            ...config,
        })
            .then((res) => {
            return res.data;
        })
            .catch((err) => {
            return Promise.reject(err);
        });
    }
}
exports.default = HttpAxios;
//# sourceMappingURL=httpAxios.api.js.map