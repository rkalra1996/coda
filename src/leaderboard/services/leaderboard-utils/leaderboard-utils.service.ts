import { Injectable } from '@nestjs/common';
import { LeaderboardUpdateDTO } from 'src/leaderboard/dto/leaderboard.dto';


@Injectable()
export class LeaderboardUtilsService {

    private sendGenericError(status: number, error: string) {
        return {
            ok: false, 
            data: null,
            error: error || 'Request Body is not correct',
            status: status || 400
        }
    }
    constructor() {}

    private prepareleaderboardScores(team: any, oldEntry = null) {
        const data = {...team}
         if (!oldEntry) {
             const d = {
                 _id: data._id,
                 wins: data.won ? 1 : 0,
                 losses: data.lose ? 1 : 0,
                 ties: data.tie ? 1 : 0,
                 score: 0,
                 team_name: data.team_name,
             }
             d.score = 3 * d.wins + 1 * d.ties;
             return d
         }
         oldEntry.wins += data.won ? 1 : 0,
         oldEntry.losses += data.lose ? 1 : 0
         oldEntry.ties += data.tie ? 1 : 0,
         oldEntry.score = 3 * oldEntry.wins + 1 * oldEntry.ties;
         return oldEntry;
    }

    processUpdateReqBody(rawBody: LeaderboardUpdateDTO): any {
        if (!Array.isArray(rawBody.teams) || !rawBody.teams.length ) {
            return this.sendGenericError(400, 'Request Body malformed, either teams is not an array or its empty');
        }
        const instancesOK = rawBody.teams.some((team) =>{
            if (!team.team_name || !team.team_name.length) {
                return true
            }
            if (!team.team_name.hasOwnProperty('won') && !team.team_name.hasOwnProperty('tie')) {
                return true
            }
        })
        if (instancesOK) {
            const tempMap = new Map();
            rawBody.teams.forEach(team => {
                if (!tempMap.has(team.team_name)) {
                    tempMap.set(team.team_name, this.prepareleaderboardScores(team))
                } else {
                    tempMap.set(team.team_name,this.prepareleaderboardScores(team, tempMap.get(team.team_name)))
                }
            })
            return {
                ok: true,
                data: [...tempMap.values()]
        } 
    }
    return this.sendGenericError(400, 'Request body is malformed');
}

getPaginationQuery(queryObj: any) {
    return {
        page : queryObj.page ? parseInt(queryObj.page): 0,
        size: queryObj.size? parseInt(queryObj.size): 10,
        search: queryObj.q ? queryObj.q : ''
}
}

processAddTeamReqBody(body: any) {
    if (!body.hasOwnProperty('names')) {
        return this.sendGenericError(400, 'names array is mandatory')
    }
    if (!Array.isArray(body.names) || !body.names.length) {
        return this.sendGenericError(400, 'names should be non empty array');
    }
    if(!body.names.every((name: any) => typeof name === 'string' && name.length)) {
        return this.sendGenericError(400, 'each name should be a non empty string')
    }
    return {
        ok: true,
        status: 200,
        data: [...body.names].map(name => {return {team_name: name, wins: 0, losses: 0, ties: 0, score: 0}}),
        error: null
    }
}
}
