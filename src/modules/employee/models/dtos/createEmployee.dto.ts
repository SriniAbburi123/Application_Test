import { constants } from 'crypto';
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

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Employee Name' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiPropertyOptional({ description: 'Designation of the employee' })
  @IsString()
  position: string;
  @ApiPropertyOptional({ description: 'Email Address of the employee' })
  @IsString()
  email: string;
  @ApiPropertyOptional({ description: 'Array of Skills of the employee' })
  @IsArray()
  skillIds: [string];
  @ApiPropertyOptional({ description: 'Hiredate of the employee' })
  @IsDate()
  hireDate: Date;
  @ApiPropertyOptional({ description: 'Password of the employee' })
  @IsString()
  password: string;
  @ApiPropertyOptional({ description: 'Performance score of the employee' })
  @IsNumber()
  engagementScore: number;
  @ApiPropertyOptional({ description: 'Roles of the employee' })
  @IsArray()
  roles: Role[];
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
