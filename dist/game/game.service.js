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
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const game_entity_1 = require("./game.entity");
const http_wrapper_service_1 = require("../api/http-wrapper.service");
const externalGames_service_1 = require("./externalGames.service");
let GameService = class GameService {
    constructor(gameRepository, httpWrapperRepository, externalGamesService) {
        this.gameRepository = gameRepository;
        this.httpWrapperRepository = httpWrapperRepository;
        this.externalGamesService = externalGamesService;
    }
    async gamyById(gameId) {
        const cachedGame = await this.gameRepository.findOneBy({ _id: gameId });
        console.log(gameId, !!cachedGame);
        if (cachedGame)
            return cachedGame;
        try {
            const response = await this.externalGamesService.getGameById(gameId);
            const res = await this.createGame(response);
            console.log(res);
            return response;
        }
        catch (error) {
            throw new Error(`Failed to fetch and save game data: ${error.message}`);
        }
    }
    async fetchAndSaveGameData() {
        return await this.gameRepository.find();
    }
    async createGame(createGameDTO) {
        const game = new game_entity_1.GameEntity();
        Object.assign(game, createGameDTO);
        return await this.gameRepository.save(game);
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(game_entity_1.GameEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        http_wrapper_service_1.HttpWrapperService,
        externalGames_service_1.ExternalGamesService])
], GameService);
//# sourceMappingURL=game.service.js.map