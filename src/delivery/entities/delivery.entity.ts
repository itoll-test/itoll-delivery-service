import { UUID } from 'crypto';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Business } from './business.entity';
import { Consignment } from './consignment.entity';

@Entity()
export class Delivery extends BaseEntity {
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

  @ManyToOne(() => Business, (business) => business.deliveries)
  bussines: Business;

  @OneToMany(() => Consignment, (consignment) => consignment.courier)
  consignments: Consignment[];
}
