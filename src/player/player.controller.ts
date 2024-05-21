import {
  Controller,
  Param,
  Get,
  NotFoundException,
  Query
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { IPagination } from 'src/types';
import { GameService } from 'src/game/game.service';

@Controller('player')
export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly gameService: GameService
  ) {}

  @Get('name/:name')
  async playerByName(@Param('name') name: string) {
    try {
      return await this.playerService.playerByName(name);
    } catch (error) {
      throw new NotFoundException('Player not found');
    }
  }

  @Get('matchesByName/:name')
  async playerMatchesByName(
    @Param('name') name: string,
    @Query() pagination: IPagination
  ) {
    try {
      console.log('name', name);
      const player = await this.playerService.playerByName(name);
      console.log(player, 'player')
      const matches = await this.playerService.playerMatches(
        player._id,
        pagination
      );
      console.log(matches, 'matches')
      await this.gameService.addMultipleGames(matches);
      console.log('add multiple games')
      return matches;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Player not found');
    }
  }

  @Get('matchHistory/:id')
  async playerMatches(
    @Param('id') id: string,
    @Query() pagination: IPagination
  ) {
    try {
      const matches = await this.playerService.playerMatches(id, pagination);
      await this.gameService.addMultipleGames(matches);
      return matches;
    } catch (error) {
      throw new NotFoundException('Player not found');
    }
  }
}
