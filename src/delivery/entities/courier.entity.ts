import { UUID } from 'crypto';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Consignment } from './consignment.entity';

@Entity()
export class Courier extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'varchar', length: '255' })
  name: string;

  @Column({ type: 'varchar', length: '255' })
  username: string;

  @Column({ type: 'varchar', length: '128' })
  password: string;

  @OneToMany(() => Consignment, (consignment) => consignment.courier)
  consignments: Consignment[];
}
