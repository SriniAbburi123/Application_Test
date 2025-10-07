import {
  Body,
  Controller,
  Logger,
  Delete,
  Get,
  Query,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../models/enums/roles.enum';
import {
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ReportsService } from './reports.service'; 
import {GetAllSkillsResponse} from './models/dtos/employee-skills-response.dto';

@ApiTags('report')
@Controller('report')
export class ReportsController {
  private readonly logger = new Logger(ReportsController.name);
  constructor(private readonly reportsService: ReportsService) {}

  

  @Get('skill-popularity')
  @ApiOperation({
    summary: 'Get count of employees of all skills',
  })
  @ApiResponse({
    status: 200,
    description: 'Data fetched successfully from DB',
    type: GetAllSkillsResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Error in fetching the data from DB',
  })
  async getAllSkilledEmployees(@Res() response) {
    this.logger.debug(
      'In the service: ReportsController.name \t method: getAllSkilledEmployees.name',
    );
    try {
      const data: GetAllSkillsResponse =
        await this.reportsService.getCountOfEmployeesOfAllSkills();
      return response.status(HttpStatus.OK).json({ data });
    } catch (err) {
      return response.status(HttpStatus.OK).json(err);
    }
  }
}