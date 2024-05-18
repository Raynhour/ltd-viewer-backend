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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerController = void 0;
const common_1 = require("@nestjs/common");
const player_service_1 = require("./player.service");
const game_service_1 = require("../game/game.service");
let PlayerController = class PlayerController {
    constructor(playerService, gameService) {
        this.playerService = playerService;
        this.gameService = gameService;
    }
    async playerByName(name) {
        try {
            return await this.playerService.playerByName(name);
        }
        catch (error) {
            throw new common_1.NotFoundException('Player not found');
        }
    }
    async playerMatchesByName(name, pagination) {
        try {
            const player = await this.playerService.playerByName(name);
            const matches = await this.playerService.playerMatches(player._id, pagination);
            await this.gameService.addMultipleGames(matches);
            return matches;
        }
        catch (error) {
            console.log(error);
            throw new common_1.NotFoundException('Player not found');
        }
    }
    async playerMatches(id, pagination) {
        try {
            const matches = await this.playerService.playerMatches(id, pagination);
            await this.gameService.addMultipleGames(matches);
            return matches;
        }
        catch (error) {
            throw new common_1.NotFoundException('Player not found');
        }
    }
};
exports.PlayerController = PlayerController;
__decorate([
    (0, common_1.Get)('name/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "playerByName", null);
__decorate([
    (0, common_1.Get)('matchesByName/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "playerMatchesByName", null);
__decorate([
    (0, common_1.Get)('matchHistory/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "playerMatches", null);
exports.PlayerController = PlayerController = __decorate([
    (0, common_1.Controller)('player'),
    __metadata("design:paramtypes", [player_service_1.PlayerService,
        game_service_1.GameService])
], PlayerController);
//# sourceMappingURL=player.controller.js.map