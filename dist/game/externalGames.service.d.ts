import { HttpWrapperService } from '../api/http-wrapper.service';
import { GameEntity } from './game.entity';
export declare class ExternalGamesService {
    private httpWrapperService;
    constructor(httpWrapperService: HttpWrapperService);
    getGameById(id: string): Promise<GameEntity>;
}
