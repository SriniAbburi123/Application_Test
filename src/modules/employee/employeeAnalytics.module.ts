import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee } from '../../models/schemas/EmployeeSchema';
import { EmployeeController } from './employee.controller';
import { EmployeeAnalyticsService } from './EmployeeAnalytics.service';
import { EmployeeSchema } from '../../models/schemas/EmployeeSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeAnalyticsService],
})
export class EmployeeAnalyticsModule {}
