import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';

export class AuthPhoneLoginDto {
  @ApiProperty({ example: 2547000000, type: Number })
  @Transform(lowerCaseTransformer)
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
