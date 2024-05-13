import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'game' })
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  _id: string;

  @Column({ default: false })
  isNotFound: boolean;

  @Column({ default: '1.0' })
  version: string;

  @Column({ type: 'timestamp', default: '12.03.2024' })
  date: Date;

  @Column({ default: 'ranked' })
  queueType: string;

  @Column({ type: 'int', default: 1 })
  endingWave: number;

  @Column({ type: 'int', default: 1 })
  gameLength: number;

  @Column({ type: 'int', default: 1 })
  gameElo: number;

  @Column({ type: 'int', default: 1 })
  playerCount: number;

  @Column({ type: 'int', default: 1 })
  humanCount: number;

  @Column('text', { array: true, default: [] })
  spellChoices: string[];

  @Column('float', { array: true, default: [] })
  leftKingPercentHp: number[];

  @Column('float', { array: true, default: [] })
  rightKingPercentHp: number[];

  @Column({ default: 'none' })
  kingSpell: string;

  @Column({ default: false })
  incomenchill: boolean;

  @Column({ nullable: true, default: null })
  votedmode: string;

  @Column({ nullable: true, default: null })
  availablemode: string;

  @Column('simple-json', { nullable: true, default: null })
  playersData: PlayerData[];

  // Define other columns...
}

@Entity()
export class PlayerData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playerId: string;

  @Column()
  playerName: string;

  @Column()
  playerSlot: number;

  @Column()
  legion: string;

  @Column({ type: 'float' })
  workers: number;

  @Column()
  value: number;

  @Column({ default: false })
  cross: boolean;

  @Column()
  gameResult: string;

  @Column()
  classicElo: number;

  @Column()
  overallElo: number;

  @Column()
  eloChange: number;

  @Column()
  fighters: string;

  @Column({ default: false })
  eco: boolean;

  @Column()
  mercenaries: string;

  @Column({ default: true })
  stayedUntilEnd: boolean;

  @Column()
  chosenSpell: string;

  @Column()
  chosenSpellLocation: string;

  @Column()
  partySize: number;

  @Column()
  firstWaveFighters: string;

  @Column()
  rolls: string;

  @Column()
  legionSpecificElo: number;

  @Column('simple-array')
  partyMembers: string[];

  @Column('simple-array')
  partyMembersIds: string[];

  @Column()
  mvpScore: number;

  @Column('simple-array')
  netWorthPerWave: number[];

  @Column('simple-array')
  valuePerWave: number[];

  @Column('simple-array')
  workersPerWave: number[];

  @Column('simple-array')
  incomePerWave: number[];

  @Column('simple-array', { nullable: true })
  mercenariesSentPerWave: string[][];

  @Column('simple-array', { nullable: true })
  mercenariesReceivedPerWave: string[][];

  @Column('simple-array', { nullable: true })
  leaksPerWave: string[][];

  @Column('simple-array', { nullable: true })
  buildPerWave: string[][];

  @Column()
  leakValue: number;

  @Column()
  leaksCaughtValue: number;

  @Column({ default: -1 })
  leftAtSeconds: number;

  @Column('simple-array', { nullable: true })
  kingUpgradesPerWave: string[][];

  @Column('simple-array', { nullable: true })
  opponentKingUpgradesPerWave: string[][];

  @Column({ default: false })
  megamind: boolean;

  @Column()
  chosenChampionLocation: string;
}
