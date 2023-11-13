import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { Status } from 'src/statuses/entities/status.entity';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { TypeCar } from 'src/type-car/entities/type-car.entity';
import { User } from 'src/users/entities/user.entity';
import { upperCaseTransformer } from 'src/utils/transformers/upper-case.transformer';

export class CreateCarDto {
  @ApiProperty({ example: 'Nissan' })
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 'Kicks' })
  @Validate(IsNotExist, ['Car'], {
    message: 'carAlreadyExists',
  })
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 'JJJ-78678' })
  @Transform(upperCaseTransformer)
  @Validate(IsNotExist, ['Car'], {
    message: 'carAlreadyExists',
  })
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty({ example: 42 })
  @IsNotEmpty()
  capacity: number;

  @ApiProperty({ type: User })
  @Validate(IsExist, ['User', 'id'], {
    message: 'userNotExists',
  })
  user?: User | null;

  @ApiProperty({ type: () => TypeCar })
  @IsOptional()
  @Validate(IsExist, ['TypeCar', 'id'], {
    message: 'typeNotExists',
  })
  type?: TypeCar | null;

  @ApiProperty({ type: Status })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  status?: Status;
}
