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
import { Employee } from '../employee/models/schemas/EmployeeSchema';
import { Skill } from '../skill/models/schemas/SkillSchema';
import { EmployeeSkillsResponseDto } from './models/dtos/employee-skills-response.dto';
import { GetAllSkillsResponse } from './models/dtos/employee-skills-response.dto';
 
@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);
  constructor(
    @InjectModel('Employee') private employeeModel: Model<Employee>,
    @InjectModel('Skill') private skillModel: Model<Skill>,
  ) {}

  
  // Get All skilled employees from DB using pipeline.
    async getCountOfEmployeesOfAllSkills(): Promise<GetAllSkillsResponse> {
      this.logger.debug(
        'In the service: ReportsService.name \t method: getAllSkilledEmployees.name',
      );
      const skillData: EmployeeSkillsResponseDto[] =
        await this.employeeModel.aggregate([
          // Unwind the skills array to get individual skill details
          { $unwind: {path: '$Skills'} },
          // Omit the superadmin record from the output
          { $match: {Name: { $ne: "superadmin" } // exclude records with name 'superadmin'
            },
          },
          // Omit the records with null as the skill
          { $match: {Skills: { $ne: null } // exclude records with null as the skill. 
            },
          },
          /*
          // Join with Skill collection to get skill details
          { $lookup: {
              from: 'Skill', // Collection name of Skill
              localField: 'Skills', // Field name in Employee collection
              foreignField: 'Name', // Field in Skill collection
              as: 'skillData', // Alias for the joined data
            },
          },
          
          // Unwind the skills array to get individual skill details
          { $unwind: '$skillData', },
          */ 
          // Group the employees of that skill
          { $group: {
            _id: '$Skills',
            count: { $sum: 1 }, //  Count of employees with that skill
            
            /* Data: {
              $push {
                Skill: '$_id',
                Count: '$count',
              },
            },
            */
          }},
         
          
          // Set the skill in the output
          { $set: { Count: '$sum', Skill: '$_id', }  }, 
           
          // { $project: { Data: 1, Count: 1}, },
          // { $project: { Data: 1 } },
          // Unset the _id field of the employee
          { $unset: '_id' },
          // Sort the names of the employees in ascending order
          // { $sort: { Name: 1 } },
      ]);

      this.logger.debug(
        'getAllSkilledEmployees: Skilled Employee Data:',
        skillData,
      );
      const employeeData = new GetAllSkillsResponse(skillData);
      return employeeData;
    }
}