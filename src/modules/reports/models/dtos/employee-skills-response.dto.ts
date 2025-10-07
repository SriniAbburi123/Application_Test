import { constants } from 'crypto';

import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsNotEmpty,
  IsString,
  IsObject,
} from 'class-validator';


export class EmployeeSkillsResponseDto {
  @ApiProperty({ description: 'Count of Employees for the skill' })
  @IsNotEmpty()
  Count: Number;
  @ApiPropertyOptional({ description: 'Skill of the employee' })
  @IsString()
  Skill: string;
   
}

export class GetAllSkillsResponse {
  @ApiPropertyOptional({ description: 'Corresponding employee data' })
  @IsArray()
  employeeData: EmployeeSkillsResponseDto[];
  constructor(skillData) {
    this.employeeData = skillData;
  }
}