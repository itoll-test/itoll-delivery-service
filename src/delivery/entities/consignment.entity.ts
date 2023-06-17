import { UUID } from 'crypto';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Courier } from './courier.entity';
import { Delivery } from './delivery.entity';

enum State {
  NOT_RECIEVED = 'NOT_RECIEVED',
  RECIEVED = 'RECIEVED',
  TOWARD_DESTINATION = 'TOWARD_DESTINATION',
  DELIVERD = 'DELIVERD',
}

@Entity()
export class Consignment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Index({ spatial: true })
  @Column({ type: 'geography', spatialFeatureType: 'Point' })
  location: Point;

  @Column({ type: 'enum', enum: State, default: State.NOT_RECIEVED })
  state: State;

  @ManyToOne(() => Courier, (courier) => courier.consignments)
  courier: Courier;

  @ManyToOne(() => Delivery, (delivery) => delivery.consignments)
  delivery: Delivery;
}
