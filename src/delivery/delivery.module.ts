import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { Business } from './entities/business.entity';
import { Consignment } from './entities/consignment.entity';
import { Courier } from './entities/courier.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Delivery, Business, Consignment, Courier]),
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
