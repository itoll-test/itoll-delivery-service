import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from './entities/delivery.entity';
import { Business } from './entities/business.entity';
import { Courier } from './entities/courier.entity';
import { HttpModule } from '@nestjs/axios';
import { BusinessService } from './business.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Delivery, Business, Courier]),
  ],
  controllers: [DeliveryController],
  providers: [DeliveryService, BusinessService],
})
export class DeliveryModule {}
