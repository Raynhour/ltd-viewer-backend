"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("./errorHandler");
class Api {
    constructor(http) {
        this.http = http;
    }
    static getInstance(http) {
        if (this.instance)
            return this.instance;
        return new Api(http);
    }
    async request(url, config) {
        const _config = { ...config };
        if (!('headers' in _config)) {
            _config.headers = {};
        }
        _config.headers['x-api-key'] = '';
        try {
            return await new this.http(url, _config).request();
        }
        catch (error) {
            return Promise.reject(new errorHandler_1.default(error).handle());
        }
    }
    async get(url, config) {
        const _config = {
            method: 'get',
        };
        _config.method = 'get';
        const res = await this.request(url, {
            ...config,
            ..._config,
        });
        return res;
    }
    async post(url, data, config) {
        const _config = {
            method: 'post',
            data: data,
        };
        const res = await this.request(url, {
            ...config,
            ..._config,
        });
        return res;
    }
}
exports.default = Api;
//# sourceMappingURL=api.js.map