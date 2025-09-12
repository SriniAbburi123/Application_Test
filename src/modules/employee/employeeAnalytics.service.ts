import { Injectable, Logger,PipeTransform, NotFoundException, InternalServerErrorException, BadRequestException, ConflictException, Get } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './models/dtos/createEmployee.dto';
 
@Injectable()
export class EmployeeAnalyticsService {
  private readonly logger = new Logger(EmployeeAnalyticsService.name);
  
  constructor(private readonly employeeService: EmployeeService) { }

  // Calculate the engagement score of the employee.
  async getEngagementScore(updateEmployeeDto: UpdateEmployeeDto){
    const score = this.employeeService.calculateEngagementScore(updateEmployeeDto);
  }

  // Get Employee data from DB for reporting purpose.
  async getEmployeeData()  {
    return this.employeeService.getAllEmployees();
  }
}