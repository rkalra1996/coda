import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LeaderboardResponseDTO } from 'src/leaderboard/dto/leaderboard-response.dto';
import { LeaderboardGatewayService } from 'src/leaderboard/events/leaderboard-gateway/leaderboard-gateway.service';
import { Leaderboard, LeaderboardDocument } from 'src/leaderboard/schemas/leaderboad.schema';

@Injectable()
export class LeaderboardCoreService {

    constructor(@InjectModel(Leaderboard.name) private leaderboardModel: Model<LeaderboardDocument>, private readonly leaderboardEvent: LeaderboardGatewayService) {}

    async updateLeaderboard(data: any): Promise<LeaderboardResponseDTO> {
        try {
            const promises = data.data.map(async team => {
                const incObj = {
                    wins: team.wins,
                    losses: team.losses,
                    ties: team.ties,
                    score: team.score,
                }
                return await this.leaderboardModel.findOneAndUpdate(
                {_id: team._id},
                {
                    $inc: {...incObj} 
                },
                {new: true, lean: true}
                )})
            const responses = await Promise.all(promises)
            const filteredResponses = responses.filter(v => v).map((res: any) => {
                const obj = res;
                delete obj.__v;
                return obj;
            });
            this.leaderboardEvent.notifyClientForUpdatedLeaderBoard(filteredResponses);
            return {
                ok: true,
                data: filteredResponses,
                status: 200
            }
        } catch (e) {
            console.log('Error occured while updating data on database', e.toString());
            return {
                ok: false,
                status: 500,
                error: null,
                data: null
            }
        }
    }

    async getLeaderBoardData(query: any) {
        try {
            const iteratorPos = (query.page * query.size);
            const size = query.size > 0 ? query.size : 10;
            const totalDocs = await this.leaderboardModel.countDocuments();
            const totalPages = totalDocs / size;
            let response = null
            if (query.search) {
                response = await this.leaderboardModel.find({team_name: {$regex: new RegExp(query.search, 'i')}})
                .sort({score: -1, team_name: 1, _id: 1})
                .lean()
                .skip(iteratorPos > 0 ? iteratorPos : 0)
                .limit(size);
            } else {
                response = await this.leaderboardModel
                .find()
                .sort({score: -1, team_name: 1, _id: 1})
                .lean()
                .skip(iteratorPos > 0 ? iteratorPos : 0)
                .limit(size);
            }
            return {
                ok: true,
                status: 200,
                error: null,
                data: {
                    total: totalDocs,
                    totalPages,
                    page: query.page,
                    size,
                    data: response,
                }
            }
        } catch (e) {
            console.log('Error occured while reading data from database', e.toString());
            return {
                ok: false,
                status: 500,
                error: null,
                data: null
            }
        }
    }

    async addNewTeam(teams: Array<any>) {
        try {
            const response = await this.leaderboardModel.insertMany([...teams])
            this.leaderboardEvent.notifyClientForUpdatedLeaderBoard(teams)
            return {
                ok: true,
                status: 200,
                data: response.map(r => r.toJSON()),
                error: null
            }
        } catch (err) {
            console.log('An error occured while adding new teams', err.toString())
            return {
                ok: false,
                status: 500,
                error: '',
                data: null
            }
        }
    }
}
