import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { GreetingController } from './greeting.controller';
import { ExternalApiController } from './modules/external-api/externalApi.controller';
import { ExternalApiService } from './modules/external-api/externa-api.service';
// import { GameService } from './game/game.service';
// import { GameController } from './game/game.controller';
// import { GameRepository } from './game/game.repository'; // Import the repository
import ormconfig from './db/ormconfig';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    HttpModule,
    GameModule,
    TypeOrmModule.forRoot(ormconfig),
    ConfigModule.forRoot({ isGlobal: true })
  ],
  controllers: [AppController, GreetingController, ExternalApiController],
  providers: [AppService, ExternalApiService]
  // modules: [GameModule]
})
export class AppModule {}
