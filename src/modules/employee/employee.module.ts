import { Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './models/schemas/EmployeeSchema';
import { Skill, SkillSchema } from '../skill/models/schemas/SkillSchema';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeAnalyticsService } from '../employeeAnalytics/employeeAnalytics.service';

@Module({
imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: Skill.name, schema: SkillSchema },
    ]),
  ],

  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeAnalyticsService],
  exports: [EmployeeService, EmployeeAnalyticsService],
})
export class EmployeeModule {}
