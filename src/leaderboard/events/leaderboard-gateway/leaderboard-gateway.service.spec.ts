import { Test, TestingModule } from '@nestjs/testing';
import { LeaderboardGatewayService } from './leaderboard-gateway.service';

describe('LeaderboardGatewayService', () => {
  let service: LeaderboardGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaderboardGatewayService],
    }).compile();

    service = module.get<LeaderboardGatewayService>(LeaderboardGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
