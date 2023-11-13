import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeFuel } from 'src/type-fuel/entities/type-fuel.entity';
import { TypeFuelSeedService } from './type-fuel-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeFuel])],
  providers: [TypeFuelSeedService],
  exports: [TypeFuelSeedService],
})
export class TypeFuelSeedModule {}
