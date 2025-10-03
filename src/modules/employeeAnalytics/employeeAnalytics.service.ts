import {
  Injectable,
  Inject,
  forwardRef,
  Logger} from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
@Injectable()
export class EmployeeAnalyticsService {
  constructor(
    @Inject(forwardRef(() =>  EmployeeService))
    private readonly employeeService: EmployeeService,
  ) {}

  private readonly logger = new Logger(EmployeeAnalyticsService.name);
  // Calculate the engagement score of the employee.
  async getEngagementScore(empName: string): Promise<void> {
    this.logger.debug('getEngagementScore: Employee Name: ',empName);
    this.calculateEngagementScore(empName);
  }

  // Calculate the engagement score of the employee.
  async calculateEngagementScore(
    empName: string
  ): Promise<void> {
    this.logger.debug('calculateEngagementScore: Employee Name: ',empName);
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
    // Update the score in the corresponding employee document
    await this.employeeService.UpdateEmployeeScore(score, empName);
  }
}
