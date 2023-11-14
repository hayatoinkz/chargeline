import { Module } from '@nestjs/common';
import { FuelSupplyController } from './fuel-supply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { FuelSupply } from './entities/fuel-supply.entity';
import { FuelSupplyService } from './fuel-supply.service';

@Module({
  imports: [TypeOrmModule.forFeature([FuelSupply])],
  controllers: [FuelSupplyController],
  providers: [IsExist, IsNotExist, FuelSupplyService],
  exports: [FuelSupplyService],
})
export class FuelSupplyModule {}
