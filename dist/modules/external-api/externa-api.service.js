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
exports.ExternalApiService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
const operators_1 = require("rxjs/operators");
let ExternalApiService = class ExternalApiService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    fetchDataFromExternalApi() {
        const headers = {
            'x-api-key': process.env.X_API_KEY
        };
        return this.httpService
            .get('https://apiv2.legiontd2.com/players/byName/raynhour', { headers })
            .pipe((0, operators_1.catchError)((error) => {
            return (0, rxjs_1.throwError)(error);
        }));
    }
    saveData(data) {
        console.log('Data received from external API:', data);
    }
};
exports.ExternalApiService = ExternalApiService;
exports.ExternalApiService = ExternalApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ExternalApiService);
//# sourceMappingURL=externa-api.service.js.map