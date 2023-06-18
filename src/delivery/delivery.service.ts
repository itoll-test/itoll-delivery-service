import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery, State } from './entities/delivery.entity';
import { Repository } from 'typeorm';
import { Business } from './entities/business.entity';
import { Courier } from './entities/courier.entity';
import { UUID } from 'crypto';
import { UpdateConsignmentDto } from './dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private deliveryRepository: Repository<Delivery>,
  ) {}

  //business
  /**
   * @param createDeliveryDto
   * @param Business
   * @returns Promise<Delivery>
   */
  async createDelivery(
    createDeliveryDto: CreateDeliveryDto,
    business: Business,
  ): Promise<Delivery> {
    const newDelivery: Delivery =
      this.deliveryRepository.create(createDeliveryDto);
    newDelivery.business = business;

    return this.deliveryRepository.save(newDelivery);
  }

  //courier
  /**
   * This method returns list of delivery, that their state is equalTo NOT_RECIEVED
   * @returns Promise<Delivery[]>
   */
  async findAllNotRecieved(): Promise<Delivery[]> {
    return await this.deliveryRepository.find({
      where: { state: State.NOT_RECIEVED },
    });
  }

  //courier
  /**
   * This method create new consginment entry with default value location of delivery and State.note_received
   * @param delivery: Delivery
   * @param courier: Courier
   * @returns Promise<Consignment>
   */
  async createConsginment(
    delivery: Delivery,
    courier: Courier,
  ): Promise<Consignment> {
    const newConsignment: Consignment = this.consignmentRepository.create({
      location: delivery.originLocation,
    });
    newConsignment.delivery = delivery;
    newConsignment.courier = courier;

    return await this.consignmentRepository.save(newConsignment);
  }

  /**
   * This method returns one consignment by delivery
   * @param delivery: Delivery
   * @returns Promise<Consignment>
   */
  async findOneConsignment(delivery: Delivery): Promise<Consignment> {
    return this.consignmentRepository.findOne({ where: delivery });
  }

  /**
   * This method returns one delivery
   * @param id: UUID
   * @returns Promise<Delivery>
   */
  async findOneDelivery(id: UUID): Promise<Delivery> {
    return await this.deliveryRepository.findOne({ where: { id } });
  }

  /**
   * This method updates delivery entity
   * @param id:UUID
   * @param updateDelivery
   * @returns Promise<Delivery>
   */
  async updateDelivery(id: UUID, updateDelivery: Delivery): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({ where: { id } });

    return await this.deliveryRepository.save({
      ...delivery,
      ...updateDelivery,
    });
  }

  /**
   *
   * @param id:UUID
   * @param UpdateConsignmentDto: UpdateConsignmentDto
   * @returns Promise<Consignment>
   */
  async updateConsignment(
    id: UUID,
    UpdateConsignmentDto: UpdateConsignmentDto,
  ): Promise<Consignment> {
    const consginment = await this.deliveryRepository.findOne({
      where: { id },
    });

    return await this.consignmentRepository.save({
      ...consginment,
      ...UpdateConsignmentDto,
    });
  }
}
