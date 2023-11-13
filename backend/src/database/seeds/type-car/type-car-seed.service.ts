import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeCar } from 'src/type-car/entities/type-car.entity';
import { TypeCarEnum } from 'src/type-car/type-car.enum';
import { Repository } from 'typeorm';

@Injectable()
export class TypeCarSeedService {
  constructor(
    @InjectRepository(TypeCar)
    private repository: Repository<TypeCar>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: TypeCarEnum.flex,
          name: 'Flex',
        }),
        this.repository.create({
          id: TypeCarEnum.diesel,
          name: 'Diesel',
        }),
      ]);
    }
  }
}
