import { constants } from "crypto";

 
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsNotEmpty,
  IsString,
  IsObject,
} from 'class-validator';

export class GetMatchedEmployeeSkillsResponseDto {
  @ApiProperty({ description: 'Employee Name' })
  @IsString()
  @IsNotEmpty()
  Name: string;
  @ApiPropertyOptional({ description: 'Skills of the employee' })
  @IsArray()
  SkillIds: [string];
  constructor(data) {
    this.Name = data.Name;
    this.SkillIds = data.skillIds;
  }
}

export class GetMatchedEmployeeSkillsResponse {
  @ApiPropertyOptional({ description: 'Count of the employees matching skills' })
  @IsNumber()
  @IsNotEmpty()
  count: number;
  @ApiPropertyOptional({ description: 'Skill name' })
  @IsString()
  empSkill: string;
  @ApiPropertyOptional({ description: 'Corresponding employee data' })
  @IsArray()
  @IsObject()
  employeeData:GetMatchedEmployeeSkillsResponseDto[];

  constructor(data) {
    this.count = data.count;
    this.empSkill = data.EmployeSkill;
    this.employeeData = data.employeeData;
  }
}

export class GetMatchedEmployeeAllSkillsResponse {
  @ApiPropertyOptional({ description: 'Skill name' })
  @IsString()
  empSkill: string;
  @ApiPropertyOptional({ description: 'Corresponding employee data' })
  @IsString()
  employeeData: string;

  constructor(data) {
    this.empSkill = data.EmployeSkill;
    this.employeeData = data.employeeData;
  }
}