import { Injectable } from '@nestjs/common';
import { HttpWrapperService } from '../api/http-wrapper.service';
import { GameEntity } from './game.entity';

@Injectable()
export class ExternalGamesService {
  constructor(private httpWrapperService: HttpWrapperService) {}

  async getGameById(id: string): Promise<GameEntity> {
    const params = {
      includeDetails: true
    };
    const response = await this.httpWrapperService.get<GameEntity>(
      `https://apiv2.legiontd2.com/games/byId/${id}`,
      params
    );
    return response.data;
  }

  // Add other methods for interacting with the JSONPlaceholder API...
}
