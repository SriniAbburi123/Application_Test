import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ description: 'Skill Name' })
  @IsString()
  @IsNotEmpty()
  Name: string;
  @ApiPropertyOptional({ description: 'Skill description' })
  @IsString()
  Description: string;
}
export class UpdateSkillDto extends PartialType(CreateSkillDto) {}
