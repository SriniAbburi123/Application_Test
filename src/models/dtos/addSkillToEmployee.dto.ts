import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsObject,
  IsArray
} from 'class-validator';

export class AddSkillsEmployeeDto {
  @ApiProperty({ description: ' Employee Id' })
  @IsObject()
  @IsNotEmpty()
  empId:Object;
  @ApiPropertyOptional({ description: 'Array of Skills ' })
  @IsArray()
  @IsString()
  skills:string[];
}
 