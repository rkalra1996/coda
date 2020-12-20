import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeaderboardModule } from './leaderboard/leaderboard.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://rishabh:123Rishu@cluster0.euv0l.mongodb.net/coda?retryWrites=true&w=majority', {useNewUrlParser: true, useFindAndModify: false}),
    LeaderboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
