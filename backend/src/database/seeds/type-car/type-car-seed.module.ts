import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeCar } from 'src/type-car/entities/type-car.entity';
import { TypeCarSeedService } from './type-car-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeCar])],
  providers: [TypeCarSeedService],
  exports: [TypeCarSeedService],
})
export class TypeCarSeedModule {}
