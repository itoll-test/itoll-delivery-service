import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Point } from 'typeorm';

export class UpdateDeliveryLocationDto {
  @Expose()
  @IsNotEmpty()
  readonly currentLocation: Point;

  constructor(partial: Partial<UpdateDeliveryLocationDto>) {
    Object.assign(this, partial);
  }
}
