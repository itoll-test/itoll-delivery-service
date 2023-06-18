import { UUID } from 'crypto';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Courier } from './courier.entity';
import { Delivery } from './delivery.entity';

@Entity()
export class Consignment {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Index({ spatial: true })
  @Column({ type: 'geography', spatialFeatureType: 'Point' })
  location: Point;

  @ManyToOne(() => Courier, (courier) => courier.consignments)
  courier?: Courier;

  @OneToOne(() => Delivery, (delivery) => delivery.consignments)
  @JoinColumn()
  delivery?: Delivery;
}
