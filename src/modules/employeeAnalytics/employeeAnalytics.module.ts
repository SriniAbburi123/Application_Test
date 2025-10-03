import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from '../employee/models/schemas/EmployeeSchema';
import { Skill, SkillSchema } from '../skill/models/schemas/SkillSchema';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeAnalyticsService } from './employeeAnalytics.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: Skill.name, schema: SkillSchema },
    ]),
  ],
  providers: [EmployeeService, EmployeeAnalyticsService],
  exports: [EmployeeAnalyticsService],

})
export class EmployeeAnalyticsModule {}
