import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; 
import { Employee, EmployeeSchema } from '../employee/models/schemas/EmployeeSchema';
import { Skill, SkillSchema } from '../skill/models/schemas/SkillSchema';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
    imports: [
        MongooseModule.forFeature([
        { name: Employee.name, schema: EmployeeSchema },
        { name: Skill.name, schema: SkillSchema },
        ]),
    ],

    controllers: [ReportsController],
    providers: [ReportsService],
    exports: [ReportsService],
})
export class ReportsModule {}
