export interface Player {
  username?: string;
  steamId?: string;
  leaderPlayedTimes?: {
    [key: string]: number;
  };
  totalOfPlayedGames?: number;
  timesReplacing?: number;
  timesReplaced?: number;
  ranking?: {
    freeForAll?: {
      totalOfMatchInFirstPlace?: number;
      wins?: number;
      loses?: number;
      mu?: number;
      sigma?: number;
    };
    teams?: {
      wins?: number;
      loses?: number;
      mu?: number;
      sigma?: number;
    };
  };
}
