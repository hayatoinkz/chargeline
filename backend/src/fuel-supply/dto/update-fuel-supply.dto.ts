import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { CreateFuelSupplyDto } from './create-fuel-supply.dto';
import { TypeFuel } from 'src/type-fuel/entities/type-fuel.entity';

export class UpdateFuelSupplyDto extends PartialType(CreateFuelSupplyDto) {
  @ApiProperty({ example: 12 })
  @IsOptional()
  quantity: number;

  @ApiProperty({ example: 6.5 })
  @IsOptional()
  price: number;

  @ApiProperty({ example: 105.12 })
  @IsOptional()
  totalPrice: number;

  @ApiProperty({ type: () => TypeFuel })
  @IsOptional()
  @Validate(IsExist, ['TypeFuel', 'id'], {
    message: 'typeNotExists',
  })
  type?: TypeFuel | null;
}
