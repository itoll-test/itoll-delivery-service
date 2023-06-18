import { UUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Delivery } from './delivery.entity';

@Entity()
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'varchar', length: '255' })
  name: string;

  @Column({ type: 'varchar', length: '128' })
  password: string;
  @Column({ type: 'varchar', length: '255' })
  webhook: string;

  @OneToMany(() => Delivery, (delivery) => delivery.business)
  deliveries?: Delivery[];
}
