import { constants } from 'crypto';
import { Transform, Type,  } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsNotEmpty,
  IsString,
  IsDate,
  IsISO8601,
  IsDateString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../../../models/enums/roles.enum';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Employee Name' })
  @IsString()
  @IsNotEmpty()
  
  Name: string;
  @ApiPropertyOptional({ description: 'Designation of the employee' })
  @IsString()
  Position: string;
  @ApiPropertyOptional({ description: 'Email Address of the employee' })
  @IsString()
  Email: string;
  @ApiPropertyOptional({ description: 'Array of Skills of the employee' })
  @IsArray()
  Skills: [string];
  @ApiPropertyOptional({ description: 'Hiredate of the employee' })
  @IsDateString()
  // @IsISO8601({ strict: true, strictSeparator: true })
  // @Transform(() => Date)
  HireDate: Date;
  @ApiPropertyOptional({ description: 'Password of the employee' })
  @IsString()
  Password: string;
  @ApiPropertyOptional({ description: 'Performance score of the employee' })
  @IsNumber()
  EngagementScore: number;
  @ApiPropertyOptional({ description: 'Roles of the employee' })
  @IsArray()
  Roles: Role[];
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
