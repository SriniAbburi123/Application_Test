import { Injectable, Logger,PipeTransform, NotFoundException, InternalServerErrorException, BadRequestException, ConflictException, Get } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EmployeeAnalyticsService } from './employeeAnalytics.service';
import { Employee } from '../../models/schemas/EmployeeSchema';
import { Skill } from '../../models/schemas/SkillSchema';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../../models/dtos/createEmployee.dto';
import {GetMatchedEmployeeAllSkillsResponse}  from '../../models/dtos/get-matched-employee-skills-response.dto';
import { 
  GetMatchedEmployeeSkillsResponseDto,
  GetMatchedEmployeeSkillsResponse
 } from '../../models/dtos/get-matched-employee-skills-response.dto';
import { PostMatchedEmployeeDto } from '../../models/dtos/post-matched-employee.dto';
import { AddSkillsEmployeeDto } from '../../models/dtos/addSkillToEmployee.dto';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);
  constructor(@InjectModel('Employee') private employeeModel:Model<Employee>, @InjectModel('Skill') private skillModel:Model<Skill>,
  private readonly employeeAnalyticsService: EmployeeAnalyticsService){ }
   
  // Create the employee in mongo db.
  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    console.log("Employee Data: ", createEmployeeDto);
    const empId = createEmployeeDto.name;
    const existingEmployee = await this.employeeModel.findOne({ EmployeeId: empId }).exec();
    // console.log("Employee Data:", existingEmployee);
    if (existingEmployee) {
      this.logger.error("Employee alreadt exists");
    }
    const newEmployee = new this.employeeModel(createEmployeeDto);
    console.log("Created the employee");
    return newEmployee.save();
  }

  // Update the employee in db.
  async updateEmployee(EmpId: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const filter = {EmployeeId: EmpId};
    const existingEmployee = await this.employeeModel.findOneAndUpdate(filter, updateEmployeeDto, { new: true }).exec();
    if (!existingEmployee) {
      this.logger.error(`Employee #${EmpId} not found`);
    }
    return existingEmployee;
  }

  // Get All skilled employees from DB using pipeline.
  async getAllSkilledEmployees(): Promise<GetMatchedEmployeeAllSkillsResponse[]> {
    console.log("In the service method: getAllSkilledEmployees");
    const employeeData:GetMatchedEmployeeAllSkillsResponse[] = await this.employeeModel.aggregate([
      { $unwind: {path: "$EmployeeSkills" }},
      { $group: { _id: "$EmployeeSkills",
        Employees: {
          $push: {
            empId: "$EmployeeId",
            empName: "$EmployeeName"
            }
          }  
        }
      },
      // { $project: { EmpSkill: "$_id", Employees: 1 } },
      { $project: { Employees: 1 } },
      { $set: {EmpSkill: "$_id"}},
      { $unset: "_id" },
      { $sort: { EmployeeId: 1 },}, 
    ]);
    
    console.log("Employee Data: ", JSON.stringify(employeeData, null,2));
    console.log("Employee Data: ", employeeData);

    return employeeData;
  }

  // Get skilled employees from DB using pipeline in a specific format.
  async getSkilledEmployees(postMatchEmployeeDto:PostMatchedEmployeeDto): Promise<GetMatchedEmployeeSkillsResponse> {
    console.log("In the service method: getMatchedEmployees")
    console.log("Employee Skill: ", postMatchEmployeeDto.empSkill);
    const skill =  postMatchEmployeeDto.empSkill;
    console.log("Required SKill:", skill);
    const employeeData:GetMatchedEmployeeSkillsResponseDto[] = await this.employeeModel.aggregate([
    { $match: { EmployeeSkills: skill }, },
    { $project: { EmployeeName: 1, _id: 0 } },
    { $sort: { EmployeeName: 1 },},
    ]);

    const count = await this.employeeModel.countDocuments({ EmployeeSkills: skill });

    console.log("Count:", count);
    console.log("Employees Data: ", employeeData);
    
    const data:GetMatchedEmployeeSkillsResponse = {count:count, empSkill:skill, employeeData}
    return data;
  }

  // Get matched employees of speciied skill from db using pipeline.
  async getMatchedEmployees(empSkill:string): Promise<GetMatchedEmployeeSkillsResponse> {
    console.log("In the service method: getMatchedEmployees")
    console.log("Employee Skill: ", empSkill);
    
    const employeeData:GetMatchedEmployeeSkillsResponseDto[] = await this.employeeModel.aggregate([
      { $match: { EmployeeSkills: empSkill }, },
      { $project: { EmployeeName: 1, _id: 0 } },
      { $sort: { EmployeeName: 1 },},
    ]);

    const count = await this.employeeModel.countDocuments({ EmployeeSkills: empSkill });
    
    console.log("Count:", count);
    console.log("Employees Data: ", employeeData);
   
    const data:GetMatchedEmployeeSkillsResponse = {count, empSkill, employeeData}
    return data;
  }

  // Get all the data from the Employee collection.
  async getAllEmployees(): Promise<Employee[]> {
    const employeeData = await this.employeeModel.find().exec();
    if (!employeeData || employeeData.length == 0) {
      this.logger.error('Employees data not found!');
    }
    return employeeData;
  }

  // Get the data of the specific Employee from db.
  async getEmployee(empName: string): Promise<Employee> {
    console.log("Employee Name: ", empName);
    const existingEmployee = await this.employeeModel.findOne({ EmployeeName: empName }).exec();
    console.log("Employee Data:", existingEmployee);
    if (!existingEmployee) {
      this.logger.error(`Employee #${empName} not found`);
    }
    return existingEmployee;
  }

  // Delete the specific employee from collection.
  async deleteEmployee(empName: string): Promise<Employee> {
    const filter = {EmployeeId: empName};
    const deletedEmployee = await this.employeeModel.findOneAndDelete(filter).exec();
    if (!deletedEmployee) {
      this.logger.error(`Employee #${empName} not found`);
    } 
    return deletedEmployee;
  }

  // Get matched employees of speciied skill from db without pipeline.
  async getEmployeesOfSkill(skill:string):Promise<any> { 
    //console.log(" Skill required: ", skill);
    const employeesOfSkill = await this.employeeModel.find({ EmployeeSkills: skill }).exec();
    const count = await this.employeeModel.countDocuments({ EmployeeSkills: skill });
    const employeesOutput: any[] = [];

    for (const user of employeesOfSkill) {
      console.log ( 'Count:' + count, ' Id: ' + user.Name, 'Name: ');
      const userJson = {
        'employeeName': user.Name,
      }
      employeesOutput.push(userJson);
      console.log("Skills Response: ", employeesOutput);
    }
    const data = [{
      Skill: skill,
      Count: count,
      Employees: employeesOutput,
    }]
    return data;
  }

  // Caluclate the engagement score and update the score field of the corresponding employee.
  async updateScore(updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const empName = updateEmployeeDto.name;
    const filter = {EmployeeName: empName};
    // Caluclate the engagement score
    const score = this.employeeAnalyticsService.calculateEngagementScore(updateEmployeeDto);

    const existingEmployee = await this.employeeModel.findByIdAndUpdate(filter, { $set: { EngagementScore: score }}).exec();
    this.logger.debug(`Updated Employee #${existingEmployee}`);
    if (!existingEmployee) {
      this.logger.error(`Employee #${empName} not found`);
    }
    return existingEmployee;
  }

  // Add the specified skills to the corresponding Employee.
  async addSkillsToEmployee(addSkillsDto:AddSkillsEmployeeDto): Promise<Employee> {
    const empId = addSkillsDto.empId;
    const skills = addSkillsDto.skills;
    const filter = {_id: empId};
    // const updatedEmployee = await this.employeeModel.findOneAndUpdate(filter, skills, { new: true }).exec();
    const updatedEmployee = await this.employeeModel.findByIdAndUpdate(filter, { $set: { skill: skills }}).exec();
    this.logger.debug(`Updated Employee #${updatedEmployee}`);
    if (!updatedEmployee) {
      this.logger.error(`Employee #${empId} not found`);
    }
    return updatedEmployee;
  }
}