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
        if (cachedGame)
            return cachedGame;
        try {
            const response = await this.externalGamesService.getGameById(gameId);
            await this.createGame(response);
            return response;
        }
        catch (error) {
            if (error.message.includes('404')) {
                throw new common_1.HttpException('Game not found', 404);
            }
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
    async addMultipleGames(games) {
        try {
            return await this.gameRepository.manager.transaction(async (transactionalEntityManager) => {
                console.log('insde transcations');
                const savedGames = await Promise.all(games
                    .filter((gameDTO) => !!gameDTO._id)
                    .map(async (gameDTO) => {
                    try {
                        console.log('before find', gameDTO._id);
                        const gameInDB = await this.gameRepository.findOneBy({
                            _id: gameDTO._id
                        });
                        console.log('after', gameInDB);
                        if (gameInDB)
                            return;
                    }
                    catch (error) {
                        console.log('error', error);
                    }
                    const game = new game_entity_1.GameEntity();
                    Object.assign(game, gameDTO);
                    console.log('before save');
                    try {
                        await transactionalEntityManager.save(game);
                    }
                    catch (error) {
                        console.log('Failed to save game', error.message);
                    }
                    await transactionalEntityManager.save(game);
                }));
                await this.gameRepository.find();
                return savedGames;
            });
        }
        catch (error) {
            console.log('failed to save', error);
            return [];
        }
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