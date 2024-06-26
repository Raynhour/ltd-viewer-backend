export declare class createGameSessionDto {
    id: number;
    _id: string;
    kingSpell: string;
    incomenchill: boolean;
    votedmode?: string;
    availablemode?: string;
    date: Date;
    endingWave: number;
    gameLength: number;
    gameElo: number;
    playerCount: number;
    humanCount: number;
    spellChoices: string[];
    leftKingPercentHp: number[];
    rightKingPercentHp: number[];
    playersData: PlayerDataDto[];
}
export declare class PlayerDataDto {
    id: number;
    playerId: string;
    playerName: string;
    playerSlot: number;
    legion: string;
    workers: number;
    value: number;
    cross: boolean;
    gameResult: string;
    classicElo: number;
    overallElo: number;
    eloChange: number;
    fighters: string;
    eco: boolean;
    mercenaries: string;
    stayedUntilEnd: boolean;
    chosenSpell: string;
    chosenSpellLocation: string;
    partySize: number;
    firstWaveFighters: string;
    rolls: string;
    legionSpecificElo: number;
    partyMembers: string[];
    partyMembersIds: string[];
    mvpScore: number;
    netWorthPerWave: number[];
    valuePerWave: number[];
    workersPerWave: number[];
    incomePerWave: number[];
    mercenariesSentPerWave: string[][];
    mercenariesReceivedPerWave: string[][];
    leaksPerWave: string[][];
    buildPerWave: string[][];
    leakValue: number;
    leaksCaughtValue: number;
    leftAtSeconds: number;
    kingUpgradesPerWave: string[][];
    opponentKingUpgradesPerWave: string[][];
    megamind: boolean;
    chosenChampionLocation: string;
}
