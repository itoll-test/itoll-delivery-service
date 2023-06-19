import { Expose } from 'class-transformer';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { Point } from 'typeorm';

export class CreateDeliveryDto {
  @Expose()
  @IsNotEmpty()
  readonly senderLocation: Point;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly senderAddress: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly senderName: string;

  @Expose()
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly senderPhone: string;

  @Expose()
  @IsNotEmpty()
  readonly recieverLocation: Point;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly recieverAddress: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly recieverName: string;

  @Expose()
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly recieverPhone: string;

  constructor(partial: Partial<CreateDeliveryDto>) {
    Object.assign(this, partial);
  }
}
