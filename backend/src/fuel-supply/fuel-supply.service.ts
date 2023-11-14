import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from '../utils/types/nullable.type';
import { User } from 'src/users/entities/user.entity';
import { FuelSupply } from './entities/fuel-supply.entity';
import { CreateFuelSupplyDto } from './dto/create-fuel-supply.dto';
import {
  FilterFuelSupplyDto,
  SortFuelSupplyDto,
} from './dto/query-fuel-supply.dto';

@Injectable()
export class FuelSupplyService {
  constructor(
    @InjectRepository(FuelSupply)
    private carsRepository: Repository<FuelSupply>,
  ) {}

  create(createProfileDto: CreateFuelSupplyDto): Promise<FuelSupply> {
    return this.carsRepository.save(
      this.carsRepository.create(createProfileDto),
    );
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterFuelSupplyDto | null;
    sortOptions?: SortFuelSupplyDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<FuelSupply[]> {
    const where: FindOptionsWhere<FuelSupply> = {};

    if (filterOptions?.types?.length) {
      where.type = filterOptions.types.map((type) => ({
        id: type.id,
      }));
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

  findOne(
    fields: EntityCondition<FuelSupply>,
  ): Promise<NullableType<FuelSupply>> {
    return this.carsRepository.findOne({
      where: fields,
    });
  }

  update(
    id: User['id'],
    payload: DeepPartial<FuelSupply>,
  ): Promise<FuelSupply> {
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
