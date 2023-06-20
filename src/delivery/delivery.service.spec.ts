import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryService } from './delivery.service';
import { Repository } from 'typeorm';
import { Delivery } from './entities/delivery.entity';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { createTestConfig } from './test/db.config';
import { Courier } from './entities/courier.entity';
import { Business } from './entities/business.entity';
import { CreateDeliveryDto } from './dto';
import { createDeliveryStub } from './test/stubs';
import { createDeliveryResponseStub } from './test/stubs/create.delivery.response.stub';
import { BusinessStub } from './test/stubs/business.stub';

jest.mock('./delivery.repository');

describe('DeliveryService', () => {
  let service: DeliveryService;
  let deliveryRepository: Repository<Delivery>;

  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(createTestConfig([Delivery, Courier, Business])),
        TypeOrmModule.forFeature([Delivery, Courier, Business]),
      ],
      providers: [DeliveryService],
    }).compile();

    service = module.get<DeliveryService>(DeliveryService);
    deliveryRepository = module.get<Repository<Delivery>>(
      getRepositoryToken(Delivery),
    );
  });
  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When createDelivery called', () => {
    let delivery: Delivery = createDeliveryResponseStub();
    const business: Business = BusinessStub();
    const createDeliveryDto: CreateDeliveryDto = createDeliveryStub();
    beforeEach(async () => {
      delivery = await service.createDelivery(createDeliveryDto, business);
    });
    it('Should calls create() method', () => {
      expect(deliveryRepository.create).toBeCalledWith(createDeliveryDto);
    });
    it('Should calls save() method', () => {
      expect(deliveryRepository.save).toBeCalledWith(delivery);
    });
  });
});
