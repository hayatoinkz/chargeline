import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { TypeCar } from 'src/type-car/entities/type-car.entity';
import { FuelSupply } from '../entities/fuel-supply.entity';

export class FilterFuelSupplyDto {
  @ApiProperty({ type: TypeCar })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TypeCar)
  types?: TypeCar[] | null;

  @ApiProperty({ type: Number })
  @IsOptional()
  carId?: number | null;

  @ApiProperty({ example: 'Nissan' })
  @IsOptional()
  @IsString()
  brand?: string | null;

  @ApiProperty({ example: 42 })
  @IsOptional()
  @IsNumber()
  capacity?: number | null;
}

export class SortFuelSupplyDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof FuelSupply;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryFuelSupplyDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterFuelSupplyDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterFuelSupplyDto)
  filters?: FilterFuelSupplyDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value
      ? plainToInstance(SortFuelSupplyDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortFuelSupplyDto)
  sort?: SortFuelSupplyDto[] | null;
}
