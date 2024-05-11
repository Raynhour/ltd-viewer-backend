import { Repository } from 'typeorm';
import { GameEntity } from './game.entity';
import { HttpWrapperService } from 'src/api/http-wrapper.service';
import { ExternalGamesService } from './externalGames.service';
import { createGameSessionDto } from './dto/createGameSession.dto';
export declare class GameService {
    private gameRepository;
    private httpWrapperRepository;
    private externalGamesService;
    constructor(gameRepository: Repository<GameEntity>, httpWrapperRepository: HttpWrapperService, externalGamesService: ExternalGamesService);
    gamyById(gameId: string): Promise<GameEntity>;
    fetchAndSaveGameData(): Promise<GameEntity[]>;
    createGame(createGameDTO: createGameSessionDto): Promise<GameEntity>;
}
