import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  ParseUUIDPipe,
  ParseEnumPipe,
  HttpStatus,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryStateDto } from './dto/update-delivery-state.dto';
import { Business } from './entities/business.entity';
import { BusinessStub } from './test/stubs/business.stub';
import { Delivery, State } from './entities/delivery.entity';
import { UUID } from 'crypto';
import { UpdateDeliveryLocationDto } from './dto/update-delivery-location.dto';
import { BusinessService } from './business.service';

@Controller({ version: '1', path: 'delivery' })
export class DeliveryController {
  constructor(
    private readonly deliveryService: DeliveryService,
    private readonly businessService: BusinessService,
  ) {}

  @Post()
  async create(
    @Body() createDeliveryDto: CreateDeliveryDto,
  ): Promise<Delivery | HttpException> {
    try {
      const business: Business = BusinessStub();
      const newDelivery = await this.deliveryService.createDelivery(
        createDeliveryDto,
        business,
      );
      return newDelivery;
    } catch (error) {
      throw error;
    }
  }

  @Get(':state/state')
  async findAllNotAcceptedByCourier(
    @Param('state', new ParseEnumPipe(State))
    state: State,
  ): Promise<Delivery[] | HttpException> {
    try {
      if (state !== State.NOT_ACCPTED_BY_COURIER) {
        throw new HttpException(
          'State you entered is not allowed',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.deliveryService.findAllByState(state);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: UUID,
  ): Promise<Delivery | HttpException> {
    try {
      return this.deliveryService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id/state')
  async updateState(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateDeliveryStateDto: UpdateDeliveryStateDto,
  ): Promise<Delivery | HttpException> {
    try {
      //TODO: check delivery with this ID exists.
      const delivery: Delivery = await this.deliveryService.update(
        id,
        updateDeliveryStateDto,
      );

      const business = await this.businessService.findOne(delivery.businessId);

      this.deliveryService.webhook(business.webhook, delivery);

      return delivery;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id/location')
  async updateLocation(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateDeliveryLocationDto: UpdateDeliveryLocationDto,
  ): Promise<Delivery | HttpException> {
    try {
      //TODO: check delivery with this ID exists.
      const delivery: Delivery = await this.deliveryService.update(
        id,
        updateDeliveryLocationDto,
      );
      const business = await this.businessService.findOne(delivery.businessId);

      this.deliveryService.webhook(business.webhook, delivery);
      return delivery;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id/cancel')
  async cancel(
    @Param('id', ParseUUIDPipe) id: UUID,
  ): Promise<Delivery | HttpException> {
    try {
      const delivery: Delivery = await this.deliveryService.findOne(id);

      if (
        delivery.state === State.NOT_ACCPTED_BY_COURIER ||
        delivery.state === State.ACCPTED_BY_COURIER
      ) {
        return await this.deliveryService.update(id, { state: State.CANCLED });
      }
      throw new HttpException(
        'Action you do is not allowed.',
        HttpStatus.FORBIDDEN,
      );
    } catch (error) {
      throw error;
    }
  }
}
