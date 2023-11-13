import { PartialType } from '@nestjs/swagger';
import { CreateTypeFuelDto } from './create-type-fuel.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateTypeFuelDto extends PartialType(CreateTypeFuelDto) {
  @ApiProperty({ example: 'Gasolina' })
  @IsOptional()
  name: string;

  @ApiProperty({ example: 6.12 })
  @IsOptional()
  price: number;
}
