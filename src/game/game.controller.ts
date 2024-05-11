import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  NotFoundException
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/createGame.dto';
// import { GameEntity } from './game.entity';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async getAllGames(): Promise<any> {
    return await this.gameService.fetchAndSaveGameData();
  }

  @Get(':id')
  async getGameById(@Param('id') id: string): Promise<any> {
    try {
      return await this.gameService.gamyById(id);
    } catch (error) {
      throw new NotFoundException('Game not founds');
    }
  }
}
