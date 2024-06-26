import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PlayerEntity } from './entities/player.entity';
import { ExternalPlayerService } from './externalPlayer.service';
import { PlayerDto } from './dto/player.dto';
import { IPagination } from 'src/types';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(PlayerEntity)
    private playerRepository: Repository<PlayerEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private externalPlayerService: ExternalPlayerService
  ) {}

  async playerByName(name: string): Promise<PlayerEntity> {
    console.log('insde playerByName', name);
    const cacheKey = `player-${name.toLocaleLowerCase()}`;
    console.log('cached', cacheKey);
    let cachedData = await this.cacheManager.get<PlayerEntity>(cacheKey);
    let player: PlayerEntity = null;
    if (!cachedData) {
      const playerFromDB = await this.playerRepository
        .createQueryBuilder('player')
        .where('LOWER(player.playerName) = LOWER(:name)', { name })
        .getOne();
      if (playerFromDB) return playerFromDB;
      console.log('before fetch player');
      player = await this.externalPlayerService.getPlayerByName(name);
      console.log('after fetch player', player);
      await this.createUser(player);
      console.log('after create user');
      cachedData = player;
      await this.cacheManager.set(cacheKey, cachedData, 60000 * 15);
      console.log('after cache')
    }
    console.log('end', cachedData);
    return cachedData;
  }

  async playerById(id: string): Promise<PlayerEntity> {
    return this.getPlayer('_id', id);
  }

  private async getPlayer(field: string, value: string): Promise<PlayerEntity> {
    const cacheKey = `player-${value}`;
    let player = await this.cacheManager.get<PlayerEntity>(cacheKey);
    if (!player) {
      player = await this.playerRepository.findOneBy({ [field]: value });
      if (!player) {
        player =
          field === 'playerName'
            ? await this.externalPlayerService.getPlayerByName(value)
            : await this.externalPlayerService.getPlayerById(value);
        await this.createUser(player);
      }

      await this.cacheManager.set(cacheKey, player, 60000 * 15);
    }

    return player;
  }

  private async createUser(playerDTO: PlayerDto) {
    const player = this.playerRepository.create(playerDTO);
    player.id = player._id;
    return this.playerRepository.save(player);
  }

  async playerMatches(id: string, pagination: IPagination) {
    try {
      console.log('enter matches')
      const matches = await this.externalPlayerService.playerMatches(id, pagination);
      console.log('matches inside', matches);
      return matches;
    } catch (error) {
      throw new HttpException('Failed to fetch player matches', 400);
    }
  }
}
