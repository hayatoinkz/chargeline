import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Validate } from 'class-validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class CreateTypeFuelDto {
  @ApiProperty({ example: 'Gasolina' })
  @IsNotEmpty()
  @Validate(IsNotExist, ['TypeFuel'], {
    message: 'typeFuelAlreadyExists',
  })
  name: string;

  @ApiProperty({ example: 7.5 })
  @IsNotEmpty()
  price: number;
}
