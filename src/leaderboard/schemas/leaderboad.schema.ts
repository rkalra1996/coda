import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeaderboardDocument = Leaderboard & Document;

@Schema({ versionKey: false })
export class Leaderboard {
  @Prop({index: 1})
  team_name: string;

  @Prop()
  wins: number;

  @Prop()
  losses: number;

  @Prop()
  score: number;

  @Prop()
  ties: number;
}

export const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard);