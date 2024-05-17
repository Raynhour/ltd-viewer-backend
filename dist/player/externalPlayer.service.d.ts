import { HttpWrapperService } from '../api/http-wrapper.service';
import { PlayerEntity } from './entities/player.entity';
import { IPagination } from 'src/types';
import { GameEntity } from 'src/game/game.entity';
export declare class ExternalPlayerService {
    private httpWrapperService;
    constructor(httpWrapperService: HttpWrapperService);
    getPlayerByName(name: string): Promise<PlayerEntity>;
    getPlayerById(id: string): Promise<PlayerEntity>;
    playerMatches(id: string, pagination: IPagination): Promise<GameEntity[]>;
}
