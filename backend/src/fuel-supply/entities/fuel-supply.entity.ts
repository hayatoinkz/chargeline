import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { TypeFuel } from 'src/type-fuel/entities/type-fuel.entity';
import { Car } from 'src/car/entities/car.entity';

@Entity()
export class FuelSupply extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: Number, default: 0 })
  quantity: number;

  @Column({ type: 'decimal', default: 0 })
  price: number;

  @Column({ type: 'decimal', default: 0 })
  totalPrice: number;

  @ManyToOne(() => Car, {
    eager: true,
    cascade: true,
  })
  car?: Car | null;

  @ManyToOne(() => TypeFuel, {
    eager: true,
  })
  type?: TypeFuel | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
