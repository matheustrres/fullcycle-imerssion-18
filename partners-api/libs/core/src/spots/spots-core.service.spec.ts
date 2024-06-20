import { Test, TestingModule } from '@nestjs/testing';

import { SpotsCoreService } from './spots-core.service';

describe('SpotsCoreService', () => {
  let service: SpotsCoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpotsCoreService],
    }).compile();

    service = module.get<SpotsCoreService>(SpotsCoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
