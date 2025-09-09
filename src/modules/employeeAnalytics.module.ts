import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee } from '../models/schemas/EmployeeSchema';
import { EmployeeSkillController } from '../controllers/employeeSkill.controller';
import { EmployeeAnalyticsService } from '../services/EmployeeAnalytics.service';
import { EmployeeSchema } from '../models/schemas/EmployeeSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  controllers: [EmployeeSkillController],
  providers: [EmployeeAnalyticsService],
})
export class EmployeeAnalyticsModule {}
