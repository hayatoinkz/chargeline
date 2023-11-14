import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { NullableType } from '../utils/types/nullable.type';

import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { FuelSupplyService } from './fuel-supply.service';
import { FuelSupply } from './entities/fuel-supply.entity';
import { UpdateCarDto } from 'src/car/dto/update-car.dto';
import { CreateFuelSupplyDto } from './dto/create-fuel-supply.dto';
import { QueryFuelSupplyDto } from './dto/query-fuel-supply.dto';

@ApiBearerAuth()
@Roles(RoleEnum.user, RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('FuelSupplys')
@Controller({
  path: 'fuel-supply',
  version: '1',
})
export class FuelSupplyController {
  constructor(private readonly fuelSupplyService: FuelSupplyService) {}

  @SerializeOptions({
    groups: ['me'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateFuelSupplyDto): Promise<FuelSupply> {
    return this.fuelSupplyService.create({
      ...createProfileDto,
    });
  }

  @SerializeOptions({
    groups: ['admin', 'me'],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() query: QueryFuelSupplyDto,
  ): Promise<InfinityPaginationResultType<FuelSupply>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.fuelSupplyService.findManyWithPagination({
        filterOptions: query?.filters,
        sortOptions: query?.sort,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @SerializeOptions({
    groups: ['admin', 'me'],
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<FuelSupply>> {
    return this.fuelSupplyService.findOne({ id: +id });
  }

  @SerializeOptions({
    groups: ['admin', 'me'],
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateCarDto,
  ): Promise<FuelSupply> {
    return this.fuelSupplyService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.fuelSupplyService.softDelete(id);
  }
}
