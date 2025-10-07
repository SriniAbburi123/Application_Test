import {
  Injectable,
  Inject,
  forwardRef,
  Logger,
  PipeTransform,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
  ConflictException,
  Get,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EmployeeAnalyticsService } from '../employeeAnalytics/employeeAnalytics.service';
import { Employee } from './models/schemas/EmployeeSchema';
import { Skill } from '../skill/models/schemas/SkillSchema';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from './models/dtos/createEmployee.dto';
import { GetMatchedEmployeeAllSkillsResponse } from './models/dtos/get-matched-employee-skills-response.dto';
import {
  GetMatchedEmployeeSkillsResponseDto,
  GetMatchedEmployeeSkillsResponse,
} from './models/dtos/get-matched-employee-skills-response.dto';
import { SkillSelectionDto } from './models/dtos/skill-selection.dto';
import { AddSkillsEmployeeDto } from './models/dtos/addSkillToEmployee.dto';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);
  constructor(
    @InjectModel('Employee') private employeeModel: Model<Employee>,
    @InjectModel('Skill') private skillModel: Model<Skill>,
    @Inject(forwardRef(() =>  EmployeeAnalyticsService))
    private readonly employeeAnalyticsService:EmployeeAnalyticsService,
  ) {}

  // Create the employee in mongo db.
  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    this.logger.debug(
      'In the service: EmployeeService.name \t method: createEmployee.name',
    );
    const empName = createEmployeeDto.Name;


    const existingEmployee = await this.employeeModel
      .findOne({ Name: empName })
      .exec();

    if (existingEmployee) {
      this.logger.error('Employee already exists');
      return null;
    }
    console.log('Create Employee DTO:', createEmployeeDto);
    const newEmployee = new this.employeeModel(createEmployeeDto);

    this.logger.debug('createEmployee: Created Employee Data:', newEmployee);
    return newEmployee.save();
  }

  // Update the employee in db.
  async updateEmployee(
    EmpName: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    this.logger.debug(
      'In the service: EmployeeService.name \t method: updateEmployee.name',
    );
    const filter = { Name: EmpName };
    const UpdateEmployee = await this.employeeModel
      .findOneAndUpdate(filter, updateEmployeeDto, { new: true })
      .exec();
    this.logger.debug('Updated Employee:', UpdateEmployee);
    if (!UpdateEmployee) {
      this.logger.error('updateEmployee: Employee ${EmpName} not found');
    }
    return UpdateEmployee;
  }

  // Get All skilled employees from DB using pipeline.
  async getAllSkilledEmployees(): Promise<
    GetMatchedEmployeeAllSkillsResponse[]> {
    this.logger.debug(
      'In the service: EmployeeService.name \t method: getAllSkilledEmployees.name',
    );
    const employeeData: GetMatchedEmployeeAllSkillsResponse[] =
      await this.employeeModel.aggregate([
        { $unwind: { path: '$Skills' } },
        {
          $group: {
            _id: '$Skills',
            Employees: {
              $push: {
                empName: '$Name',
              },
            },
          },
        },
        // { $project: { EmpSkill: "$_id", Employees: 1 } },
        { $project: { Employees: 1 } },
        { $set: { Skill: '$_id' } },
        { $unset: '_id' },
        { $sort: { EmployeeId: 1 } },
      ]);
    this.logger.debug(
      'getAllSkilledEmployees: Skilled Employee Data:',
      employeeData,
    );
    return employeeData;
  }

  // Get skilled employees from DB using pipeline in a specific format.
  async getSkilledEmployees(
    skillSelectionDto: SkillSelectionDto,
  ): Promise<GetMatchedEmployeeSkillsResponse> {
    this.logger.debug(
      'In the service: EmployeeService.name \t method: getSkilledEmployees.name',
    );
    console.log('Employee Skill: ', skillSelectionDto.empSkill);
    const skill = skillSelectionDto.empSkill;
    console.log('Required SKill:', skill);
    const employeeData: GetMatchedEmployeeSkillsResponseDto[] =
      await this.employeeModel.aggregate([
        { $match: { Skills: skill } },
        { $project: { Name: 1, _id: 0 } },
        { $sort: { Name: 1 } },
      ]);

    const count = await this.employeeModel.countDocuments({
      Skills: skill,
    });
    const data: GetMatchedEmployeeSkillsResponse = {
      count: count,
      empSkill: skill,
      employeeData,
    };
    this.logger.debug('getSkilledEmployees: Skilled Employee Data:', data);
    return data;
  }

  // Get matched employees of speciied skill from db using pipeline.
  async getMatchedEmployees(
    empSkill: string,
  ): Promise<GetMatchedEmployeeSkillsResponse> {
    this.logger.debug(
      'In the service: EmployeeService.name \t method: getMatchedEmployees.name',
    );
    const employeeData: GetMatchedEmployeeSkillsResponseDto[] =
      await this.employeeModel.aggregate([
        { $match: { Skills: empSkill } },
        { $project: { Name: 1, _id: 0 } },
        { $sort: { Name: 1 } },
      ]);

    const count = await this.employeeModel.countDocuments({
      Skills: empSkill,
    });
    const data: GetMatchedEmployeeSkillsResponse = {
      count,
      empSkill,
      employeeData,
    };
    this.logger.debug('getMatchedEmployees: Matched Employee Data:', data);
    return data;
  }

  // Get all the data from the Employee collection.
  async getAllEmployees(): Promise<Employee[]> {
    this.logger.debug(
      'In the service: EmployeeService.name \t method: getAllEmployees.name',
    );
    const employeeData = await this.employeeModel.find().exec();
    if (!employeeData || employeeData.length == 0) {
      this.logger.error('getAllEmployees: Employees data not found!');
    }
    return employeeData;
  }

  // Get the data of the specific Employee from db.
  async getEmployee(empName: string): Promise<Employee> {
    this.logger.debug(
      'In the service: EmployeeService.name \t method: getEmployee.name',
    );
     
    const existingEmployee = await this.employeeModel
      .findOne({ Name: empName })
      .exec();
    console.log('Existing Employee: ', existingEmployee );
    console.log('Existing Employee Id : ', JSON.stringify(existingEmployee._id ));
    if (!existingEmployee) {
      this.logger.error(`getEmployee: Employee ${empName} not found`);
    }
    return existingEmployee;
  }

  // Delete the specific employee from collection.
  async deleteEmployee(empName: string): Promise<Employee> {
    this.logger.debug(
      'In the service: EmployeeService.name \t method: deleteEmployee.name',
    );
    const filter = { EmployeeId: empName };
    const deletedEmployee = await this.employeeModel
      .findOneAndDelete(filter)
      .exec();
    if (!deletedEmployee) {
      this.logger.error(`deleteEmployee: Employee #${empName} not found`);
    }
    return deletedEmployee;
  }

  // Get matched employees of speciied skill from db without pipeline.
  async getEmployeesOfSkill(skill: string): Promise<any> {
    this.logger.debug(
      'In the service: EmployeeService.name \t method: getEmployeesOfSkill.name',
    );
    const employeesOfSkill = await this.employeeModel
      .find({ Skills: skill })
      .exec();
    const count = await this.employeeModel.countDocuments({
      Skills: skill,
    });
    const employeesOutput: any[] = [];

    for (const user of employeesOfSkill) {
      // this.logger.debug( 'Count:' + count, ' Id: ' + user.Name, 'Name: ');
      const userJson = {
        employeeName: user.Name,
      };
      employeesOutput.push(userJson);
      this.logger.debug(
        'getEmployeesOfSkill: Skills Response: ',
        employeesOutput,
      );
    }
    const data = [
      {
        Skill: skill,
        Count: count,
        Employees: employeesOutput,
      },
    ];
    return data;
  }

  // Caluclate the engagement score and update the score field of the corresponding employee.
  async updateScore(empName: string) {
    this.logger.debug(
      'In the service: EmployeeService.name \t method: updateScore.name',
    );
     this.logger.debug(
      'In the service: EmployeeService.UpdateScore \t method: Emp Name: ' + empName);

    // Invoke GetEngagmentScore method to Caluclate the engagement score 
    // and invoke the employee service method UpdateEmployeeScore
    this.employeeAnalyticsService.getEngagementScore(empName);
  }

 async UpdateEmployeeScore(score: number, empName: string):Promise<void> {
    this.logger.debug(
      'In the service: EmployeeService.name \t method: updateScore.name',
    );
    const filter = { Name: empName };
    // Update the employee record with the score.
    const updateEmployee = await this.employeeModel
      .findOneAndUpdate(filter, { $set: { EngagementScore: score } })
      .exec();
    this.logger.debug(`updateEmployeeScore: Updated Employee score`)
    if (!updateEmployee) {
      this.logger.error(`updateEmployeeScore: Employee #${empName} not found`);
    } 
  }

  // Add the specified skills to the corresponding Employee.
  async addSkillsToEmployee(
    addSkillsDto: AddSkillsEmployeeDto,
  ): Promise<Employee> {
    this.logger.debug(
      'In the service: EmployeeService.name \t method: addSkillsToEmployee.name',
    );
    const empName = addSkillsDto.Name;
    const skills = addSkillsDto.Skills;
    this.logger.debug("Employee Name:" + empName + "Skills to be added" + skills);
    const employeeFilter = { Name: empName };
    
    for (const skill of skills) {
      const skillFilter = { Name: skill };
      // Check the skills exist in Skill documents. Return if it doesn't exist.
      const skillsExist = await this.skillModel.findOne(skillFilter).exec();
      if (!skillsExist) {
        this.logger.error(`addSkillsToEmployee: Skill #${skill} not found`);
        return null;
      }
    }
    
    this.logger.debug("Updating the user" );
    const currentEmployee = await this.employeeModel.findOne(employeeFilter).exec();
    console.log("Current Skills:" + currentEmployee.Skills);
    const currentSkills = currentEmployee.Skills
    const newSkills = currentSkills.concat(skills);
    this.logger.debug("New Skills:" + newSkills);

  
    // Update the employee with the skills.
    const updatedEmployee = await this.employeeModel
    .findOneAndUpdate(employeeFilter, { $set: { Skills: newSkills } })
      .exec();
    this.logger.debug(`Updated Employee #${updatedEmployee}`);
    if (!updatedEmployee) {
      this.logger.error(
        `updatedEmployee: Error in updating the employee record Employee #${empName}`,
      );
    }
    return updatedEmployee;
  }
}
