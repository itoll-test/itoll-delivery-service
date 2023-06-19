import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery, State } from './entities/delivery.entity';
import { Repository } from 'typeorm';
import { Business } from './entities/business.entity';
import { UUID } from 'crypto';
import { UpdateDeliveryLocationDto, UpdateDeliveryStateDto } from './dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private deliveryRepository: Repository<Delivery>,
    private readonly httpService: HttpService,
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

    newDelivery.currentLocation = newDelivery.senderLocation;
    newDelivery.business = business;

    return this.deliveryRepository.save(newDelivery);
  }

  //courier
  /**
   * This method returns list of delivery, by state
   * @returns Promise<Delivery[]>
   */
  async findAllByState(state: State): Promise<Delivery[]> {
    return await this.deliveryRepository.find({
      where: { state },
    });
  }

  /**
   * This method returns one delivery
   * @param id: UUID
   * @returns Promise<Delivery>
   */
  async findOne(id: UUID): Promise<Delivery> {
    return await this.deliveryRepository.findOne({ where: { id } });
  }

  /**
   * This method updates delivery entity
   * @param id:UUID
   * @param updateDelivery
   * @returns Promise<Delivery>
   */
  async update(
    id: UUID,
    updateDelivery: UpdateDeliveryStateDto | UpdateDeliveryLocationDto,
  ): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({ where: { id } });

    return await this.deliveryRepository.save({
      ...delivery,
      ...updateDelivery,
    });
  }

  /**
   * This method invoke webhook url
   * @param url:string
   * @returns
   */
  async webhook(url: string, delivery: Delivery): Promise<void> {
    console.log(url);
    this.httpService.post(url, delivery).subscribe({
      complete: () => {
        console.log('completed');
      },
      error: (err) => {
        throw err;
      },
    });
  }
}
