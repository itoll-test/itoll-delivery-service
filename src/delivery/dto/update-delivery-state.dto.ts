import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { State } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeliveryStateDto {
  @ApiProperty({
    enum: State,
    example: State.NOT_ACCPTED_BY_COURIER,
    description: 'The delivery state',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsEnum(State)
  readonly state: State;

  constructor(partial: Partial<UpdateDeliveryStateDto>) {
    Object.assign(this, partial);
  }
}
