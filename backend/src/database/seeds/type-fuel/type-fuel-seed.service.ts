import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeFuel } from 'src/type-fuel/entities/type-fuel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeFuelSeedService {
  constructor(
    @InjectRepository(TypeFuel)
    private repository: Repository<TypeFuel>,
  ) {}

  async run() {
    const checkGasoline = await this.repository.count({
      where: {
        name: 'Gasolina',
      },
    });

    if (!checkGasoline) {
      await this.repository.save(
        this.repository.create({
          name: 'Gasolina',
          price: 5.63,
        }),
      );
    }

    const checkEthanol = await this.repository.count({
      where: {
        name: 'Etanol',
      },
    });

    if (!checkEthanol) {
      await this.repository.save(
        this.repository.create({
          name: 'Etanol',
          price: 3.54,
        }),
      );
    }

    const checkDiesel = await this.repository.count({
      where: {
        name: 'Diesel',
      },
    });

    if (!checkDiesel) {
      await this.repository.save(
        this.repository.create({
          name: 'Diesel',
          price: 6.12,
        }),
      );
    }
  }
}
