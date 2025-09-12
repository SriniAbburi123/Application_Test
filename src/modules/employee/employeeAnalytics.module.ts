import { Module } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeAnalyticsService } from './EmployeeAnalytics.service';
 
@Module({
  imports: [
     EmployeeService, 
  ],
  providers: [EmployeeAnalyticsService],
})
export class EmployeeAnalyticsModule {}
