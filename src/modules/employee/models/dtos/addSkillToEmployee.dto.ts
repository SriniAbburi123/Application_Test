import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsObject, IsArray } from 'class-validator';

export class AddSkillsEmployeeDto {
 /*
  @ApiProperty({ description: ' Employee Id' })
  @IsObject()
  Id: Object;
  */
  @ApiProperty({ description: ' Employee Name' })
  @IsString()
  @IsNotEmpty()
  Name: String;
  @ApiPropertyOptional({ description: 'Array of Skills ' })
  @IsArray()
  Skills: [string]
}
