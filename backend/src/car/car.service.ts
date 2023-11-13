import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from '../utils/types/nullable.type';
import { Car } from './entities/car.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { FilterCarDto, SortCarDto } from './dto/query-car.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  create(createProfileDto: CreateCarDto): Promise<Car> {
    return this.carsRepository.save(
      this.carsRepository.create(createProfileDto),
    );
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCarDto | null;
    sortOptions?: SortCarDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Car[]> {
    const where: FindOptionsWhere<Car> = {};

    if (filterOptions?.types?.length) {
      where.type = filterOptions.types.map((type) => ({
        id: type.id,
      }));
    }

    if (filterOptions?.brand) {
      where.brand = filterOptions.brand;
    }

    if (filterOptions?.capacity) {
      where.capacity = filterOptions.capacity;
    }

    return this.carsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });
  }

  findOne(fields: EntityCondition<Car>): Promise<NullableType<Car>> {
    return this.carsRepository.findOne({
      where: fields,
    });
  }

  update(id: User['id'], payload: DeepPartial<Car>): Promise<Car> {
    return this.carsRepository.save(
      this.carsRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: User['id']): Promise<void> {
    await this.carsRepository.softDelete(id);
  }
}
