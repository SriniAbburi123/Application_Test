
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class PostMatchedEmployeeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  empSkill: string;
}