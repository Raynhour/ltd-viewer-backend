import { PlayerService } from './player.service';
import { IPagination } from 'src/types';
import { GameService } from 'src/game/game.service';
export declare class PlayerController {
    private readonly playerService;
    private readonly gameService;
    constructor(playerService: PlayerService, gameService: GameService);
    playerByName(name: string): Promise<import("src/player/entities/player.entity").PlayerEntity>;
    playerMatchesByName(name: string, pagination: IPagination): Promise<import("src/game/game.entity").GameEntity[]>;
    playerMatches(id: string, pagination: IPagination): Promise<import("src/game/game.entity").GameEntity[]>;
}
