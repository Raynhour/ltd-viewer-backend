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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const cache_manager_1 = require("@nestjs/cache-manager");
const player_entity_1 = require("./entities/player.entity");
const externalPlayer_service_1 = require("./externalPlayer.service");
let PlayerService = class PlayerService {
    constructor(playerRepository, cacheManager, externalPlayerService) {
        this.playerRepository = playerRepository;
        this.cacheManager = cacheManager;
        this.externalPlayerService = externalPlayerService;
    }
    async playerByName(name) {
        console.log('insde playerByName', name);
        const cacheKey = `player-${name.toLocaleLowerCase()}`;
        console.log('cached', cacheKey);
        let cachedData = await this.cacheManager.get(cacheKey);
        let player = null;
        if (!cachedData) {
            const playerFromDB = await this.playerRepository
                .createQueryBuilder('player')
                .where('LOWER(player.playerName) = LOWER(:name)', { name })
                .getOne();
            if (playerFromDB)
                return playerFromDB;
            console.log('before fetch player');
            player = await this.externalPlayerService.getPlayerByName(name);
            console.log('after fetch player', player);
            await this.createUser(player);
            cachedData = player;
            await this.cacheManager.set(cacheKey, cachedData, 60000 * 15);
        }
        return cachedData;
    }
    async playerById(id) {
        return this.getPlayer('_id', id);
    }
    async getPlayer(field, value) {
        const cacheKey = `player-${value}`;
        let player = await this.cacheManager.get(cacheKey);
        if (!player) {
            player = await this.playerRepository.findOneBy({ [field]: value });
            if (!player) {
                player =
                    field === 'playerName'
                        ? await this.externalPlayerService.getPlayerByName(value)
                        : await this.externalPlayerService.getPlayerById(value);
                await this.createUser(player);
            }
            await this.cacheManager.set(cacheKey, player, 60000 * 15);
        }
        return player;
    }
    async createUser(playerDTO) {
        const player = this.playerRepository.create(playerDTO);
        player.id = player._id;
        return this.playerRepository.save(player);
    }
    async playerMatches(id, pagination) {
        try {
            const matches = this.externalPlayerService.playerMatches(id, pagination);
            return matches;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch player matches', 400);
        }
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(player_entity_1.PlayerEntity)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_1.Repository, Object, externalPlayer_service_1.ExternalPlayerService])
], PlayerService);
//# sourceMappingURL=player.service.js.map