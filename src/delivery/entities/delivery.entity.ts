import { UUID } from 'crypto';
import { Column, Entity, Index, Point, PrimaryGeneratedColumn } from 'typeorm';
import { State } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Delivery {
  @ApiProperty({
    type: String,
    example: '5b612e3d-b4e7-44b9-adc2-c7b27d7d1046',
    description: 'The Delivery id',
    required: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ApiProperty({
    type: Object,
    example: { type: 'Point', coordinates: [36.698338, 51.387715] },
    description: 'The sender location',
    required: true,
  })
  @Index({ spatial: true })
  @Column({ type: 'geography', spatialFeatureType: 'Point' })
  senderLocation: Point;

  @ApiProperty({
    type: String,
    example: 'تهران -خیابان جمهوری-خیابان یاسری-کوچه لشکری',
    description: 'The sender Address',
    required: true,
  })
  @Column({ type: 'varchar', length: '255' })
  senderAddress: string;

  @ApiProperty({
    type: String,
    example: 'میلاد ',
    description: 'The sender Name',
    required: true,
  })
  @Column({ type: 'varchar', length: '50' })
  senderName: string;

  @ApiProperty({
    type: String,
    example: '+۹۸۹۹۰۷۵۵۳۷۸۵',
    description: 'The sender Address',
    required: true,
  })
  @Column({ type: 'varchar', length: '13' })
  senderPhone: string;

  @ApiProperty({
    example: { type: 'Point', coordinates: [36.698338, 51.387715] },
    description: 'The reciever location',
    required: true,
  })
  @Index({ spatial: true })
  @Column({ type: 'geography', spatialFeatureType: 'Point' })
  recieverLocation: Point;

  @ApiProperty({
    type: String,
    example: 'تهران-آزادی-جمال زاده',
    description: 'The reciever address',
    required: true,
  })
  @Column({ type: 'varchar', length: '255' })
  recieverAddress: string;

  @ApiProperty({
    type: String,
    example: 'Pilevar',
    description: 'The reciever name',
    required: true,
  })
  @Column({ type: 'varchar', length: '50' })
  recieverName: string;

  @ApiProperty({
    example: '+989123352323',
    description: 'The reciever number',
    required: true,
  })
  @Column({ type: 'varchar', length: '13' })
  recieverPhone: string;

  @ApiProperty({
    example: { type: 'Point', coordinates: [36.698338, 51.387715] },
    description: 'The delivery current location',
    required: false,
  })
  @Index({ spatial: true })
  @Column({ type: 'geography', spatialFeatureType: 'Point' })
  currentLocation?: Point;

  @ApiProperty({
    enum: State,
    default: State.NOT_ACCPTED_BY_COURIER,
    example: State.NOT_ACCPTED_BY_COURIER,
    description: 'The delivery state',
    required: true,
  })
  @Column({ type: 'enum', enum: State, default: State.NOT_ACCPTED_BY_COURIER })
  state: State;

  @ApiProperty({
    type: String,
    example: 'fb8edac0-0688-4cc7-8228-b3f405af3d0a',
    description: 'The bussiess id',
    required: false,
  })
  @Column('uuid')
  businessId: UUID;

  @ApiProperty({
    type: String,
    example: '7f94b87a-3268-4f42-83f2-e6796804d3e9',
    description: 'The courier id',
    required: false,
  })
  @Column('uuid')
  courierId: UUID;
}
