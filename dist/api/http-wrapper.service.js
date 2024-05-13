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
exports.HttpWrapperService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let HttpWrapperService = class HttpWrapperService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    get(url, params, _headers) {
        const headers = {
            'x-api-key': '2FdzF8Y86k6sPEH8LXIZga8SB72zhXM6fH41Jjrf',
            ..._headers
        };
        const response = (0, rxjs_1.firstValueFrom)(this.httpService.get(url, { headers, params }).pipe((0, rxjs_1.catchError)((error) => {
            console.log(error);
            throw Error(`Failed to fetch data: ${error.message}`);
        })));
        return response;
    }
};
exports.HttpWrapperService = HttpWrapperService;
exports.HttpWrapperService = HttpWrapperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], HttpWrapperService);
//# sourceMappingURL=http-wrapper.service.js.map