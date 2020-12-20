import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { LeaderboardResponseDTO } from 'src/leaderboard/dto/leaderboard-response.dto';
import { LeaderboardCoreService } from 'src/leaderboard/services/leaderboard-core/leaderboard-core.service';
import { LeaderboardUtilsService } from 'src/leaderboard/services/leaderboard-utils/leaderboard-utils.service';

const DEFAULT_ERROR = 'An unexpected error occured, try again later!!';

@Controller('leaderboard')
export class LeaderboardController {

    constructor(private readonly leaderboardUtilSrvc: LeaderboardUtilsService, private readonly leaderboardCoreSrvc: LeaderboardCoreService) {}

    @Post('update')
    async updateLeaderboard(@Body() body: any, @Res() response: Response) {
        try {
            let result = {} as LeaderboardResponseDTO;
            const requestData = this.leaderboardUtilSrvc.processUpdateReqBody({...body});
            if (requestData.ok) {
                result = await this.leaderboardCoreSrvc.updateLeaderboard(requestData);
                response.status(result.status || 500).send({status: result.status || 500, ok: result.ok || false, data: result.data || null, error: result.error})
            } else {
                response.status(requestData.status || 500).send({status: requestData.status || 500, ok: requestData.ok || false, data: requestData.data || null, error: requestData.error})
            }
        } catch (e) {
            console.log('An Error occured while processing leaderboard update api', e.toString());
            response.status(500).send({ok: false, status: 500, error: DEFAULT_ERROR})
        }
    }

    @Get('')
    async getAllLeaderboard(@Query() requestQuery: any, @Res() response: Response): Promise<any> {
        try {
            const query = this.leaderboardUtilSrvc.getPaginationQuery(requestQuery);
            const result = await this.leaderboardCoreSrvc.getLeaderBoardData({...query});
            response.status(result.status || 500).send({status: result.status || 500, ok: result.ok || false, data: result.data || null, error: result.error})
        } catch (e) {
            console.log('Error occured while process get all leaderboardTeams data ', e.toString())
            response.status(500).send({
                ok: false,
                status: 500,
                error: DEFAULT_ERROR,
                data: null
            })
        }
    }

    @Post('teams/add')
    async addLeaderboardTeam(@Body() body: any, @Res() response: Response) {
        try {
            let result = {} as LeaderboardResponseDTO;
            const requestData = this.leaderboardUtilSrvc.processAddTeamReqBody({...body });
            if (requestData.ok) {
                result = await this.leaderboardCoreSrvc.addNewTeam(requestData.data);
                response.status(result.status || 500).send({status: result.status || 500, ok: result.ok || false, data: result.data || null, error: result.error})
            } else {
                response.status(requestData.status || 500).send({status: requestData.status || 500, ok: requestData.ok || false, data: requestData.data || null, error: requestData.error})
            }
        } catch (e) {
            console.log('An Error occured while processing leaderboard update api', e.toString());
            response.status(500).send({ok: false, status: 500, error: DEFAULT_ERROR})
        }
    }

}
