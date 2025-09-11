import { Injectable, Logger,PipeTransform, NotFoundException, InternalServerErrorException, BadRequestException, ConflictException, Get } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from '../../models/schemas/EmployeeSchema';
import { UpdateEmployeeDto } from '../../models/dtos/createEmployee.dto';
 
@Injectable()
export class EmployeeAnalyticsService {
  private readonly logger = new Logger(EmployeeAnalyticsService.name);
  constructor(@InjectModel('Employee') private employeeModel:Model<Employee> ) { }
  
  // Calculate the engagement score of the employee.
  async calculateEngagementScore(updateEmployeeDto: UpdateEmployeeDto): Promise<Number> {
    this.logger.debug("calculateEngagementScore: Employee Data: ", updateEmployeeDto);
    const empName = updateEmployeeDto.name;
    const existingEmployee = await this.employeeModel.findOne({ EmployeeName: empName }).exec();
    if (!existingEmployee) {
      this.logger.error("Employee doesn't exist in database");
    }
    const skills = existingEmployee.Skills;
    const hireDate = existingEmployee.HireDate;
    const todayDate = new Date();
    const yearsDifference = todayDate.getFullYear() - hireDate.getFullYear();
    const score = (skills.length) * 10  + yearsDifference * 5;
    this.logger.debug("calculateEngagementScore: Engagement score: ", score);
    return score;
  }

  // Get Employee data from DB for reporting purpose.
  async getEmployeeData(): Promise<Employee[]> {
    const employeeData = await this.employeeModel.find().exec();
    this.logger.debug("getEmployeeData: Engagement score: ", employeeData);
    return employeeData
  }
}