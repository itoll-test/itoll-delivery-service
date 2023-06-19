import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './entities/business.entity';
import { UUID } from 'crypto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
  ) {}

  /**
   * This method returns one business
   * @param id: UUID
   * @returns Promise<Business>
   */
  async findOne(id: UUID): Promise<Business> {
    return await this.businessRepository.findOne({ where: { id } });
  }
}
