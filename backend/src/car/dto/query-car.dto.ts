import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Car } from '../entities/car.entity';
import { TypeCar } from 'src/type-car/entities/type-car.entity';

export class FilterCarDto {
  @ApiProperty({ type: TypeCar })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => TypeCar)
  types?: TypeCar[] | null;

  @ApiProperty({ example: 'Nissan' })
  @IsOptional()
  @IsString()
  brand?: string | null;

  @ApiProperty({ example: 42 })
  @IsOptional()
  @IsNumber()
  capacity?: number | null;
}

export class SortCarDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof Car;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryCarDto {
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
    value ? plainToInstance(FilterCarDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterCarDto)
  filters?: FilterCarDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    console.log(JSON.parse(value));
    return value ? plainToInstance(SortCarDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortCarDto)
  sort?: SortCarDto[] | null;
}
