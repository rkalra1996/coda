export class LeaderboardDTO {
    team_name: string;
    wins: number;
    losses: number;
    score: number;
}

export class LeaderboardUpdateDTO {
    teams: Array<{
        team_name: string,
        won?: boolean,
        tie?: boolean,
    }>;
}