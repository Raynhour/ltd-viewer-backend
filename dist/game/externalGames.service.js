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
exports.ExternalGamesService = void 0;
const common_1 = require("@nestjs/common");
const http_wrapper_service_1 = require("../api/http-wrapper.service");
let ExternalGamesService = class ExternalGamesService {
    constructor(httpWrapperService) {
        this.httpWrapperService = httpWrapperService;
    }
    async getGameById(id) {
        const params = {
            includeDetails: true
        };
        const response = await this.httpWrapperService.get(`https://apiv2.legiontd2.com/games/byId/${id}`, params);
        return response.data;
    }
};
exports.ExternalGamesService = ExternalGamesService;
exports.ExternalGamesService = ExternalGamesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_wrapper_service_1.HttpWrapperService])
], ExternalGamesService);
//# sourceMappingURL=externalGames.service.js.map