import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../../statuses/entities/status.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import { User } from 'src/users/entities/user.entity';
import { TypeCar } from 'src/type-car/entities/type-car.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Car extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: String })
  brand: string;

  @Index()
  @Column({ type: String })
  model: string;

  @Column({ type: String, unique: true })
  licensePlate: string;

  @Column({ type: Number, default: 0 })
  capacity: number;

  @Expose({ groups: ['admin'] })
  @ManyToOne(() => User, {
    eager: true,
  })
  user?: User | null;

  @ManyToOne(() => TypeCar, {
    eager: true,
  })
  type?: TypeCar | null;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
