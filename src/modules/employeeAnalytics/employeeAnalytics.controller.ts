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
import { EmployeeService } from '../employee/employee.service';
import { EmployeeAnalyticsService } from './employeeAnalytics.service';

@ApiTags('EmployeeAnalytics')
@Controller('EmployeeAnalytics')
export class EmployeeAnalyticsController {
  private readonly logger = new Logger(EmployeeAnalyticsController.name);
  constructor(private readonly employeeService: EmployeeService,
    private readonly employeeAnalyticsService: EmployeeAnalyticsService
  ) {}
}
