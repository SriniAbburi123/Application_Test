import { Injectable, Inject, forwardRef, Logger,PipeTransform, NotFoundException, InternalServerErrorException, BadRequestException, ConflictException, Get } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EmployeeAnalyticsService } from './employeeAnalytics.service';
import { Employee } from './models/schemas/EmployeeSchema';
import { Skill } from '../skill/models/schemas/SkillSchema';
import { CreateEmployeeDto, UpdateEmployeeDto } from './models/dtos/createEmployee.dto';
import { GetMatchedEmployeeAllSkillsResponse }  from './models/dtos/get-matched-employee-skills-response.dto';
import { 
  GetMatchedEmployeeSkillsResponseDto,
  GetMatchedEmployeeSkillsResponse
 } from './models/dtos/get-matched-employee-skills-response.dto';
import { SkillSelectionDto } from './models/dtos/skill-selection.dto';
import { AddSkillsEmployeeDto } from './models/dtos/addSkillToEmployee.dto';
export type  WrapperType<T> = T;

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);
  constructor(@InjectModel('Employee') private employeeModel:Model<Employee>, @InjectModel('Skill') private skillModel:Model<Skill>,
    @Inject(forwardRef(() => EmployeeAnalyticsService))
    private readonly employeeAnalyticsService: WrapperType<EmployeeAnalyticsService>) {}
   
  // Create the employee in mongo db.
  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const empId = createEmployeeDto.name;
    const existingEmployee = await this.employeeModel.findOne({ EmployeeId: empId }).exec();
    
    if (existingEmployee) {
      this.logger.error("Employee alreadt exists");
      return null;
    }
    const newEmployee = new this.employeeModel(createEmployeeDto);
    this.logger.debug("createEmployee: Created Employee Data:", newEmployee);
    return newEmployee.save();
  }

  // Update the employee in db.
  async updateEmployee(EmpId: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const filter = {EmployeeId: EmpId};
    const UpdateEmployee = await this.employeeModel.findOneAndUpdate(filter, updateEmployeeDto, { new: true }).exec();
    this.logger.debug("Updated Employee:", UpdateEmployee);
    if (!UpdateEmployee) {
      this.logger.error(`updateEmployee: Employee #${EmpId} not found`);
    }
    return UpdateEmployee;
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
    this.logger.debug("getAllSkilledEmployees: Skilled Employee Data:", employeeData);
    return employeeData;
  }

  // Get skilled employees from DB using pipeline in a specific format.
  async getSkilledEmployees(skillSelectionDto:SkillSelectionDto): Promise<GetMatchedEmployeeSkillsResponse> {
    console.log("In the service method: getMatchedEmployees")
    console.log("Employee Skill: ", skillSelectionDto.empSkill);
    const skill =  skillSelectionDto.empSkill;
    console.log("Required SKill:", skill);
    const employeeData:GetMatchedEmployeeSkillsResponseDto[] = await this.employeeModel.aggregate([
    { $match: { EmployeeSkills: skill }, },
    { $project: { EmployeeName: 1, _id: 0 } },
    { $sort: { EmployeeName: 1 },},
    ]);

    const count = await this.employeeModel.countDocuments({ EmployeeSkills: skill });
    const data:GetMatchedEmployeeSkillsResponse = {count:count, empSkill:skill, employeeData};
    this.logger.debug("getSkilledEmployees: Skilled Employee Data:", data);
    return data;
  }

  // Get matched employees of speciied skill from db using pipeline.
  async getMatchedEmployees(empSkill:string): Promise<GetMatchedEmployeeSkillsResponse> {
    const employeeData:GetMatchedEmployeeSkillsResponseDto[] = await this.employeeModel.aggregate([
      { $match: { EmployeeSkills: empSkill }, },
      { $project: { EmployeeName: 1, _id: 0 } },
      { $sort: { EmployeeName: 1 },},
    ]);

    const count = await this.employeeModel.countDocuments({ EmployeeSkills: empSkill });
    const data:GetMatchedEmployeeSkillsResponse = {count, empSkill, employeeData};
    this.logger.debug("getMatchedEmployees: Matched Employee Data:", data);
    return data;
  }

  // Get all the data from the Employee collection.
  async getAllEmployees(): Promise<Employee[]> {
    const employeeData = await this.employeeModel.find().exec();
    if (!employeeData || employeeData.length == 0) {
      this.logger.error('getAllEmployees: Employees data not found!');
    }
    return employeeData;
  }

  // Get the data of the specific Employee from db.
  async getEmployee(empName: string): Promise<Employee> {
    const existingEmployee = await this.employeeModel.findOne({ EmployeeName: empName }).exec();
    if (!existingEmployee) {
      this.logger.error(`getEmployee: Employee #${empName} not found`);
    }
    return existingEmployee;
  }

  // Delete the specific employee from collection.
  async deleteEmployee(empName: string): Promise<Employee> {
    const filter = {EmployeeId: empName};
    const deletedEmployee = await this.employeeModel.findOneAndDelete(filter).exec();
    if (!deletedEmployee) {
      this.logger.error(`deleteEmployee: Employee #${empName} not found`);
    } 
    return deletedEmployee;
  }

  // Get matched employees of speciied skill from db without pipeline.
  async getEmployeesOfSkill(skill:string):Promise<any> { 
    const employeesOfSkill = await this.employeeModel.find({ EmployeeSkills: skill }).exec();
    const count = await this.employeeModel.countDocuments({ EmployeeSkills: skill });
    const employeesOutput: any[] = [];

    for (const user of employeesOfSkill) {
      // this.logger.debug( 'Count:' + count, ' Id: ' + user.Name, 'Name: ');
      const userJson = {
        'employeeName': user.Name,
      }
      employeesOutput.push(userJson);
      this.logger.debug("getEmployeesOfSkill: Skills Response: ", employeesOutput);
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
    const score = this.employeeAnalyticsService.getEngagementScore(updateEmployeeDto);
    this.logger.debug("updateScore: Employee score: ", score);
    // Update the employee record with the score.
    const updateEmployee = await this.employeeModel.findByIdAndUpdate(filter, { $set: { EngagementScore: score }}).exec();
    this.logger.debug(`updateScore: Updated Employee #${updateEmployee}`);
    if (!updateEmployee) {
      this.logger.error(`updateScore: Employee #${empName} not found`);
    }
    return updateEmployee;
  }

  // Add the specified skills to the corresponding Employee.
  async addSkillsToEmployee(addSkillsDto:AddSkillsEmployeeDto): Promise<Employee> {
    const empId = addSkillsDto.empId;
    const skills = addSkillsDto.skills;
    const employeeFilter = {_id: empId};
    for (const skill of skills) {
      const skillFilter = {name: skill};
      // Check the skills exist in Skill documents. Return if it doesn't exist.
      const skillsExist = await this.skillModel.findOne(skillFilter).exec();
      if (!skillsExist) {
        this.logger.error(`addSkillsToEmployee: Skill #${skill} not found`);
        return null;
      }
    }
    // Update the employee with the skills. 
    const updatedEmployee = await this.employeeModel.findByIdAndUpdate(employeeFilter, { $set: { skill: skills }}).exec();
    this.logger.debug(`Updated Employee #${updatedEmployee}`);
    if (!updatedEmployee) {
      this.logger.error(`updatedEmployee: Error in updating the employee record Employee #${empId}`);
    }
    return updatedEmployee;
  }

  
}