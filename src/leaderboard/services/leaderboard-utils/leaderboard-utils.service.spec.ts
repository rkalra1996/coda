import { Test, TestingModule } from '@nestjs/testing';
import { LeaderboardUtilsService } from './leaderboard-utils.service';

describe('LeaderboardUtilsService', () => {
  let service: LeaderboardUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaderboardUtilsService],
    }).compile();

    service = module.get<LeaderboardUtilsService>(LeaderboardUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
