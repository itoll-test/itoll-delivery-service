import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Point } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeliveryLocationDto {
  @ApiProperty({
    example: { type: 'Point', coordinates: [36.698338, 51.387715] },
    description: 'The delivery current location',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  readonly currentLocation: Point;

  constructor(partial: Partial<UpdateDeliveryLocationDto>) {
    Object.assign(this, partial);
  }
}
