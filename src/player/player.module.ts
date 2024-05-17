import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpWrapperModule } from 'src/api/http.modulle';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { ExternalPlayerService } from './externalPlayer.service';
import { GameService } from 'src/game/game.service';
import { GameEntity } from 'src/game/game.entity';
import { HttpWrapperService } from 'src/api/http-wrapper.service';
import { ExternalGamesService } from 'src/game/externalGames.service';

@Module({
  imports: [
    CacheModule.register({ ttl: 600000 }),
    TypeOrmModule.forFeature([PlayerEntity]),
    TypeOrmModule.forFeature([GameEntity]),
    HttpWrapperModule
  ],
  controllers: [PlayerController],
  providers: [
    PlayerService,
    ExternalPlayerService,
    GameService,
    ExternalGamesService
  ]
})
export class PlayerModule {}
