import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { State } from '../entities/delivery.entity';

export class UpdateDeliveryStateDto {
  @Expose()
  @IsNotEmpty()
  @IsEnum(State)
  readonly state: State;

  constructor(partial: Partial<UpdateDeliveryStateDto>) {
    Object.assign(this, partial);
  }
}
