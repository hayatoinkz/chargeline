import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { TypeFuel } from './entities/type-fuel.entity';
import { TypeFuelController } from './type-fuel.controller';
import { TypeFuelService } from './type-fuel.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeFuel])],
  controllers: [TypeFuelController],
  providers: [IsExist, IsNotExist, TypeFuelService],
  exports: [TypeFuelService],
})
export class TypeFuelModule {}
