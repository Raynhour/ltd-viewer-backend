import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { PlayerEntity } from './entities/player.entity';
import { ExternalPlayerService } from './externalPlayer.service';
import { IPagination } from 'src/types';
export declare class PlayerService {
    private playerRepository;
    private cacheManager;
    private externalPlayerService;
    constructor(playerRepository: Repository<PlayerEntity>, cacheManager: Cache, externalPlayerService: ExternalPlayerService);
    playerByName(name: string): Promise<PlayerEntity>;
    playerById(id: string): Promise<PlayerEntity>;
    private getPlayer;
    private createUser;
    playerMatches(id: string, pagination: IPagination): Promise<import("src/game/game.entity").GameEntity[]>;
}
