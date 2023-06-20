import { UUID } from 'crypto';
import { Column, Entity, Index, Point, PrimaryGeneratedColumn } from 'typeorm';
import { State } from '../enums';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Index({ spatial: true })
  @Column({ type: 'geography', spatialFeatureType: 'Point' })
  senderLocation: Point;

  @Column({ type: 'varchar', length: '255' })
  senderAddress: string;

  @Column({ type: 'varchar', length: '50' })
  senderName: string;

  @Column({ type: 'varchar', length: '13' })
  senderPhone: string;

  @Index({ spatial: true })
  @Column({ type: 'geography', spatialFeatureType: 'Point' })
  recieverLocation: Point;

  @Column({ type: 'varchar', length: '255' })
  recieverAddress: string;

  @Column({ type: 'varchar', length: '50' })
  recieverName: string;

  @Column({ type: 'varchar', length: '13' })
  recieverPhone: string;

  @Index({ spatial: true })
  @Column({ type: 'geography', spatialFeatureType: 'Point' })
  currentLocation: Point;

  @Column({ type: 'enum', enum: State, default: State.NOT_ACCPTED_BY_COURIER })
  state: State;

  @Column('uuid')
  businessId: UUID;

  @Column('uuid')
  courierId: UUID;
}
