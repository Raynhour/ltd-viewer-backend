import { Module } from '@nestjs/common'
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from './game.entity';
import { HttpWrapperModule } from 'src/api/http.modulle';
import { ExternalGamesService } from './externalGames.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity]), HttpWrapperModule],
  controllers: [GameController],
  providers: [GameService, ExternalGamesService]
})
export class GameModule {}
