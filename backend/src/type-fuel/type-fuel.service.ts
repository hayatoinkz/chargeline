import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { CreateTypeFuelDto } from './dto/create-type-fuel.dto';
import { TypeFuel } from './entities/type-fuel.entity';
import { NullableType } from '../utils/types/nullable.type';
import { SortTypeFuelDto } from './dto/query-type-fuel.dto';

@Injectable()
export class TypeFuelService {
  constructor(
    @InjectRepository(TypeFuel)
    private typeFuelRepository: Repository<TypeFuel>,
  ) {}

  create(createTypeFuelDto: CreateTypeFuelDto): Promise<TypeFuel> {
    return this.typeFuelRepository.save(
      this.typeFuelRepository.create(createTypeFuelDto),
    );
  }

  findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortTypeFuelDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<TypeFuel[]> {
    const where: FindOptionsWhere<TypeFuel> = {};

    return this.typeFuelRepository.find({
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

  findOne(fields: EntityCondition<TypeFuel>): Promise<NullableType<TypeFuel>> {
    return this.typeFuelRepository.findOne({
      where: fields,
    });
  }

  update(
    id: TypeFuel['id'],
    payload: DeepPartial<TypeFuel>,
  ): Promise<TypeFuel> {
    return this.typeFuelRepository.save(
      this.typeFuelRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: TypeFuel['id']): Promise<void> {
    await this.typeFuelRepository.softDelete(id);
  }
}
