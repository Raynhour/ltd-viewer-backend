import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'player' })
export class PlayerEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  _id: string;

  @Column({ type: 'varchar', length: 255 })
  avatarUrl: string;

  @Column({ type: 'varchar', length: 255 })
  guildAvatar: string;

  @Column({ type: 'varchar', length: 255 })
  playerName: string;

  @Column({ type: 'varchar', length: 255 })
  guildTag: string;

  @Column({ type: 'varchar', length: 255 })
  guildName: string;
}
