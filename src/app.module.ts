import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
  imports: [
    MongooseModule.forRoot('', {useNewUrlParser: true, useFindAndModify: false}),
    LeaderboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
