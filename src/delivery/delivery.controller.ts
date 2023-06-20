import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  ParseUUIDPipe,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryStateDto } from './dto/update-delivery-state.dto';
import { Delivery } from './entities/delivery.entity';
import { UUID } from 'crypto';
import { UpdateDeliveryLocationDto } from './dto/update-delivery-location.dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { State } from './enums';
import { UsersService } from 'src/users/users.service';

@Controller({ version: '1', path: 'delivery' })
export class DeliveryController {
  constructor(
    private readonly deliveryService: DeliveryService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Business)
  async create(
    @Body() createDeliveryDto: CreateDeliveryDto,
    @Request() req,
  ): Promise<Delivery | HttpException> {
    try {
      const newDelivery = await this.deliveryService.createDelivery(
        createDeliveryDto,
        req.user.userId,
      );
      return newDelivery;
    } catch (error) {
      throw error;
    }
  }

  @Get('NOT_ACCPTED_BY_COURIER/state')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Courier)
  async findAllNotAcceptedByCourier(): Promise<Delivery[] | HttpException> {
    try {
      return await this.deliveryService.findAllByState(
        State.NOT_ACCPTED_BY_COURIER,
      );
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id/confirm')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Courier)
  async findOne(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Request() req,
  ): Promise<Delivery | HttpException> {
    try {
      const delivery: Delivery = await this.deliveryService.findOne(id);
      if (delivery === null) {
        throw new HttpException(
          "Delivery entity doesn't exists",
          HttpStatus.NOT_FOUND,
        );
      }
      const updateDelivery = {
        state: State.ACCPTED_BY_COURIER,
        courierId: req.user.userId,
      };
      return this.deliveryService.update(id, updateDelivery);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id/state')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Courier)
  async updateState(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateDeliveryStateDto: UpdateDeliveryStateDto,
  ): Promise<Delivery | HttpException> {
    try {
      const delivery: Delivery = await this.deliveryService.findOne(id);
      if (delivery === null) {
        throw new HttpException(
          "Delivery entity doesn't exists",
          HttpStatus.NOT_FOUND,
        );
      }

      if (
        delivery.state === 'CANCLED' ||
        delivery.state === 'DELIVERD' ||
        updateDeliveryStateDto.state === 'CANCLED'
      ) {
        throw new HttpException('Action not allowed', HttpStatus.FORBIDDEN);
      }

      const updatedDelivery: Delivery = await this.deliveryService.update(
        id,
        updateDeliveryStateDto,
      );

      const user = await this.usersService.findOneById(delivery.businessId);
      this.deliveryService.webhook(user.webhook, updatedDelivery);

      return updatedDelivery;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id/location')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Courier)
  async updateLocation(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateDeliveryLocationDto: UpdateDeliveryLocationDto,
  ): Promise<Delivery | HttpException> {
    try {
      const delivery: Delivery = await this.deliveryService.findOne(id);
      if (delivery === null) {
        throw new HttpException(
          "Delivery entity doesn't exists",
          HttpStatus.NOT_FOUND,
        );
      }

      if (
        delivery.state === 'CANCLED' ||
        delivery.state === 'NOT_ACCPTED_BY_COURIER' ||
        delivery.state === 'ACCPTED_BY_COURIER' ||
        delivery.state === 'DELIVERD'
      ) {
        throw new HttpException('Action not allowed', HttpStatus.FORBIDDEN);
      }

      const updatedDelivery: Delivery = await this.deliveryService.update(
        id,
        updateDeliveryLocationDto,
      );

      const user = await this.usersService.findOneById(delivery.businessId);
      this.deliveryService.webhook(user.webhook, updatedDelivery);

      return updatedDelivery;
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
      if (delivery === null) {
        throw new HttpException(
          "Delivery entity doesn't exists",
          HttpStatus.NOT_FOUND,
        );
      }

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
