"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalPlayerService = void 0;
const common_1 = require("@nestjs/common");
const http_wrapper_service_1 = require("../api/http-wrapper.service");
const API_URL = 'https://apiv2.legiontd2.com';
let ExternalPlayerService = class ExternalPlayerService {
    constructor(httpWrapperService) {
        this.httpWrapperService = httpWrapperService;
    }
    async getPlayerByName(name) {
        const params = {};
        const response = await this.httpWrapperService.get(`${API_URL}/players/byName/${name}`, params);
        return response.data;
    }
    async getPlayerById(id) {
        const params = {};
        const response = await this.httpWrapperService.get(`${API_URL}/players/byId/${id}`, params);
        return response.data;
    }
    async playerMatches(id, pagination) {
        const params = {
            countResults: false,
            ...pagination
        };
        const response = await this.httpWrapperService.get(`${API_URL}/players/matchHistory/${id}`, params);
        return response.data;
    }
};
exports.ExternalPlayerService = ExternalPlayerService;
exports.ExternalPlayerService = ExternalPlayerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_wrapper_service_1.HttpWrapperService])
], ExternalPlayerService);
//# sourceMappingURL=externalPlayer.service.js.map