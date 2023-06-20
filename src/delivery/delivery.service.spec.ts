import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryService } from './delivery.service';

jest.mock('./delivery.repository');

describe('DeliveryService', () => {
  let service: DeliveryService;

  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [DeliveryService],
    }).compile();

    service = module.get<DeliveryService>(DeliveryService);
  });
  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
