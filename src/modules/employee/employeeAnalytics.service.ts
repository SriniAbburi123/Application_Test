import {
  Injectable,
  Inject,
  forwardRef,
  Logger,
  PipeTransform,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
  ConflictException,
  Get,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './models/dtos/createEmployee.dto';
export type WrapperType<T> = T;

@Injectable()
export class EmployeeAnalyticsService {
  constructor(
    @Inject(forwardRef(() => EmployeeService))
    private readonly employeeService: WrapperType<EmployeeService>,
  ) {}

  private readonly logger = new Logger(EmployeeAnalyticsService.name);
  // Calculate the engagement score of the employee.
  async getEngagementScore(updateEmployeeDto: UpdateEmployeeDto): Promise<any> {
    const score = this.calculateEngagementScore(updateEmployeeDto);
    return score;
  }

  // Calculate the engagement score of the employee.
  async calculateEngagementScore(
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Number> {
    this.logger.debug(
      'calculateEngagementScore: Employee Data: ',
      updateEmployeeDto,
    );
    const empName: string = String(updateEmployeeDto.name);
    const existingEmployee = await this.employeeService.getEmployee(empName);
    if (!existingEmployee) {
      this.logger.error("Employee doesn't exist in database");
    }
    const skills = existingEmployee.Skills;
    const hireDate = existingEmployee.HireDate;
    const todayDate = new Date();
    const yearsDifference = todayDate.getFullYear() - hireDate.getFullYear();
    const score = skills.length * 10 + yearsDifference * 5;
    this.logger.debug('calculateEngagementScore: Engagement score: ', score);
    return score;
  }

  // Get Employee data from DB for reporting purpose.
  async getEmployeeData() {
    return this.employeeService.getAllEmployees();
  }
}
