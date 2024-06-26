"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const greeting_controller_1 = require("./greeting.controller");
const externalApi_controller_1 = require("./modules/external-api/externalApi.controller");
const externa_api_service_1 = require("./modules/external-api/externa-api.service");
const ormconfig_1 = require("./db/ormconfig");
const game_module_1 = require("./game/game.module");
const player_module_1 = require("./player/player.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            game_module_1.GameModule,
            typeorm_1.TypeOrmModule.forRoot(ormconfig_1.default),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            player_module_1.PlayerModule
        ],
        controllers: [app_controller_1.AppController, greeting_controller_1.GreetingController, externalApi_controller_1.ExternalApiController],
        providers: [app_service_1.AppService, externa_api_service_1.ExternalApiService]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map