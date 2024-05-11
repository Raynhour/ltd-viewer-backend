import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntity } from './game.entity';
import { HttpWrapperService } from 'src/api/http-wrapper.service';
import { ExternalGamesService } from './externalGames.service';
import { createGameSessionDto } from './dto/createGameSession.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
    private httpWrapperRepository: HttpWrapperService,
    private externalGamesService: ExternalGamesService
  ) {}

  async gamyById(gameId: string): Promise<GameEntity> {
    const cachedGame = await this.gameRepository.findOneBy({ _id: gameId });
    console.log(gameId, !!cachedGame);
    if (cachedGame) return cachedGame;
    try {
      const response = await this.externalGamesService.getGameById(gameId);

      // Save games to the database
      const res = await this.createGame(response);
      console.log(res);

      return response;
    } catch (error) {
      throw new Error(`Failed to fetch and save game data: ${error.message}`);
    }
    // return await this.gameRepository.findOneBy({ id });
  }
  async fetchAndSaveGameData(): Promise<GameEntity[]> {
    return await this.gameRepository.find();
    // try {
    //   const response = await axios.get<Game[]>('https://api.example.com/games');
    //   const games = response.data;

    //   // Save games to the database
    //   await this.gameRepository.save(games);

    //   return games;
    // } catch (error) {
    //   throw new Error(`Failed to fetch and save game data: ${error.message}`);
    // }
  }

  async createGame(createGameDTO: createGameSessionDto): Promise<GameEntity> {
    const game = new GameEntity();
    Object.assign(game, createGameDTO);
    return await this.gameRepository.save(game);
  }
}
