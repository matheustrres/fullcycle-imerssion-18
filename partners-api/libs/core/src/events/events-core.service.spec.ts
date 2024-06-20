import { Test, TestingModule } from '@nestjs/testing';

import { EventsCoreService } from './events-core.service';

describe('EventsCoreService', () => {
  let service: EventsCoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsCoreService],
    }).compile();

    service = module.get<EventsCoreService>(EventsCoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
