import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsNotEmpty,
  IsString,
  IsDate,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../../../models/enums/roles.enum';

export class SignInDto {
  @ApiProperty({ description: 'User Name', required: true })
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({ description: 'Password of the user', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}
