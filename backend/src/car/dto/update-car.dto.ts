import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { Status } from 'src/statuses/entities/status.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { User } from 'src/users/entities/user.entity';
import { CreateCarDto } from './create-car.dto';
import { Transform } from 'class-transformer';
import { upperCaseTransformer } from 'src/utils/transformers/upper-case.transformer';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @ApiProperty({ example: 'Nissan' })
  @IsOptional()
  brand: string;

  @ApiProperty({ example: 'Kicks' })
  @IsOptional()
  model: string;

  @ApiProperty({ example: 'JJJ-78678' })
  @Transform(upperCaseTransformer)
  @Validate(IsExist, ['Car'], {
    message: 'carAlreadyExists',
  })
  @IsOptional()
  licensePlate: string;

  @ApiProperty({ example: 42 })
  @IsOptional()
  capacity: number;

  @ApiProperty({ type: User })
  @Validate(IsExist, ['User', 'id'], {
    message: 'userNotExists',
  })
  @IsOptional()
  user?: User | null;

  @ApiProperty({ type: Status })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'statusNotExists',
  })
  @IsOptional()
  status?: Status;
}
