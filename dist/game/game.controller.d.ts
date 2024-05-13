import { GameService } from './game.service';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    getAllGames(): Promise<any>;
    getGameById(id: string): Promise<any>;
}
