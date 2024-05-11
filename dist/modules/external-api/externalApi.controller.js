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
exports.ExternalApiController = void 0;
const common_1 = require("@nestjs/common");
const externa_api_service_1 = require("./externa-api.service");
let ExternalApiController = class ExternalApiController {
    constructor(externalApiService) {
        this.externalApiService = externalApiService;
    }
    async fetchDataAndSave() {
        try {
            const response = await this.externalApiService
                .fetchDataFromExternalApi()
                .toPromise();
            this.externalApiService.saveData(response.data);
            return { success: true, message: 'Data fetched and saved successfully' };
        }
        catch (error) {
            return { success: false, message: 'Failed to fetch or save data' };
        }
    }
};
exports.ExternalApiController = ExternalApiController;
__decorate([
    (0, common_1.Get)('fetch-and-save'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExternalApiController.prototype, "fetchDataAndSave", null);
exports.ExternalApiController = ExternalApiController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [externa_api_service_1.ExternalApiService])
], ExternalApiController);
//# sourceMappingURL=externalApi.controller.js.map