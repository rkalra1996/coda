import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Leaderboard, LeaderboardSchema } from './schemas/leaderboad.schema';
import { LeaderboardController } from './controllers/leaderboard/leaderboard.controller';
import { LeaderboardUtilsService } from './services/leaderboard-utils/leaderboard-utils.service';
import { LeaderboardCoreService } from './services/leaderboard-core/leaderboard-core.service';
import { LeaderboardGatewayService } from './events/leaderboard-gateway/leaderboard-gateway.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Leaderboard.name, schema: LeaderboardSchema }])],
    controllers: [LeaderboardController],
    providers: [LeaderboardUtilsService, LeaderboardCoreService, LeaderboardGatewayService],
})
export class LeaderboardModule {}
