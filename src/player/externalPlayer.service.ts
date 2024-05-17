import { Injectable } from '@nestjs/common';
import { HttpWrapperService } from '../api/http-wrapper.service';
import { PlayerEntity } from './entities/player.entity';
import { IPagination } from 'src/types';
import { GameEntity } from 'src/game/game.entity';
const API_URL = 'https://apiv2.legiontd2.com';

@Injectable()
export class ExternalPlayerService {
  constructor(private httpWrapperService: HttpWrapperService) {}

  async getPlayerByName(name: string): Promise<PlayerEntity> {
    const params = {};
    const response = await this.httpWrapperService.get<PlayerEntity>(
      `${API_URL}/players/byName/${name}`,
      params
    );
    return response.data;
  }

  async getPlayerById(id: string): Promise<PlayerEntity> {
    const params = {};
    const response = await this.httpWrapperService.get<PlayerEntity>(
      `${API_URL}/players/byId/${id}`,
      params
    );
    return response.data;
  }

  async playerMatches(id: string, pagination: IPagination) {
    const params = {
      countResults: false,
      ...pagination
    };
    const response = await this.httpWrapperService.get<GameEntity[]>(
      `${API_URL}/players/matchHistory/${id}`,
      params
    );
    return response.data;
  }
}
