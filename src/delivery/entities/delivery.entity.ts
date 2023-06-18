import { UUID } from 'crypto';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToOne,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Business } from './business.entity';
import { Consignment } from './consignment.entity';

export enum State {
  NOT_RECIEVED = 'NOT_RECIEVED',
  RECIEVED = 'RECIEVED',
  TOWARD_DESTINATION = 'TOWARD_DESTINATION',
  DELIVERD = 'DELIVERD',
  CANCLED = 'CANCLED',
}

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Index({ spatial: true })
  @Column({ type: 'geography', spatialFeatureType: 'Point' })
  originLocation: Point;

  @Column({ type: 'varchar', length: '255' })
  originAddress: string;

  @Column({ type: 'varchar', length: '50' })
  senderName: string;

  @Column({ type: 'varchar', length: '13' })
  senderPhone: string;

  @Index({ spatial: true })
  @Column({ type: 'geography', spatialFeatureType: 'Point' })
  destinationLocation: Point;

  @Column({ type: 'varchar', length: '255' })
  destinationAddress: string;

  @Column({ type: 'varchar', length: '50' })
  destinationName: string;

  @Column({ type: 'varchar', length: '13' })
  destinationPhone: string;

  @Column({ type: 'enum', enum: State, default: State.NOT_RECIEVED })
  state: State;

  @ManyToOne(() => Business, (business) => business.deliveries)
  business: Business;

  @OneToOne(() => Consignment, (consignment) => consignment.delivery)
  consignments?: Consignment;
}
