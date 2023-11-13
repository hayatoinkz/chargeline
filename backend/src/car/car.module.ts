import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { CarService } from './car.service';
import { Car } from './entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  controllers: [CarController],
  providers: [IsExist, IsNotExist, CarService],
  exports: [CarService],
})
export class CarModule {}
