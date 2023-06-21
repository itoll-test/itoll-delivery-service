import { Expose } from 'class-transformer';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { Point } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryDto {
  @ApiProperty({
    type: Object,
    example: { type: 'Point', coordinates: [36.698338, 51.387715] },
    description: 'The sender location',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  readonly senderLocation: Point;

  @ApiProperty({
    type: String,
    example: 'تهران -خیابان جمهوری-خیابان یاسری-کوچه لشکری',
    description: 'The sender Address',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly senderAddress: string;

  @ApiProperty({
    type: String,
    example: 'میلاد ',
    description: 'The sender Name',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly senderName: string;

  @ApiProperty({
    type: String,
    example: '+۹۸۹۹۰۷۵۵۳۷۸۵',
    description: 'The sender Address',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly senderPhone: string;

  @ApiProperty({
    example: { type: 'Point', coordinates: [36.698338, 51.387715] },
    description: 'The reciever location',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  readonly recieverLocation: Point;

  @ApiProperty({
    type: String,
    example: 'تهران-آزادی-جمال زاده',
    description: 'The reciever address',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly recieverAddress: string;

  @ApiProperty({
    type: String,
    example: 'Pilevar',
    description: 'The reciever name',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly recieverName: string;

  @ApiProperty({
    example: '+989123352323',
    description: 'The reciever number',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly recieverPhone: string;

  constructor(partial: Partial<CreateDeliveryDto>) {
    Object.assign(this, partial);
  }
}
