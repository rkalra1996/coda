import { Test, TestingModule } from '@nestjs/testing';
import { LeaderboardCoreService } from './leaderboard-core.service';

describe('LeaderboardCoreService', () => {
  let service: LeaderboardCoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaderboardCoreService],
    }).compile();

    service = module.get<LeaderboardCoreService>(LeaderboardCoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
