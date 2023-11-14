import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { TypeFuel } from 'src/type-fuel/entities/type-fuel.entity';
import { Car } from 'src/car/entities/car.entity';

export class CreateFuelSupplyDto {
  @ApiProperty({ example: 12 })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 6.5 })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 105.12 })
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({ type: Car })
  @Validate(IsExist, ['Car', 'id'], {
    message: 'carNotExists',
  })
  car?: Car | null;

  @ApiProperty({ type: () => TypeFuel })
  @IsOptional()
  @Validate(IsExist, ['TypeFuel', 'id'], {
    message: 'typeNotExists',
  })
  type?: TypeFuel | null;
}
