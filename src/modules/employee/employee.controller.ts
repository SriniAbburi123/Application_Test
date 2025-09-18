import {
  Body,
  Controller,
  Logger,
  Delete,
  Get,
  Query,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../models/enums/roles.enum';
import {
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from './models/dtos/createEmployee.dto';
import { GetMatchedEmployeeSkillsResponse } from './models/dtos/get-matched-employee-skills-response.dto';
import { SkillSelectionDto } from './models/dtos/skill-selection.dto';
import { GetMatchedEmployeeAllSkillsResponse } from './models/dtos/get-matched-employee-skills-response.dto';
import { AddSkillsEmployeeDto } from './models/dtos/addSkillToEmployee.dto';

@ApiTags('Employee')
@Controller('Employee')
export class EmployeeController {
  private readonly logger = new Logger(EmployeeController.name);
  constructor(private readonly employeeService: EmployeeService) {}
  @Post('createEmployee')
  @Roles(Role.Admin)
  @ApiBody({ type: CreateEmployeeDto })
  @ApiOperation({
    summary: 'Add Employee in the database',
  })
  @ApiResponse({
    status: 200,
    description: 'Employee added successfully',
    type: CreateEmployeeDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to add the employee',
  })
  async createEmployee(
    @Res() response,
    @Body() createEmployeeDto: CreateEmployeeDto,
  ) {
    this.logger.debug(
      'In the service: EmployeeController.name \t method: createEmployee.name',
    );
    try {
      const newEmployee =
        await this.employeeService.createEmployee(createEmployeeDto);
      // console.log(" Returned from the service method", newEmployee);
      return response.status(HttpStatus.CREATED).json({
        message: 'Employee has been added successfully',
        newEmployee,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Employee not Created!',
        error: 'Bad Request',
      });
    }
  }

  @Post('AddSkillsToEmployee')
  @Roles(Role.Admin)
  @ApiBody({ type: AddSkillsEmployeeDto })
  @ApiOperation({
    summary: 'Add Skills to Employee in the database',
  })
  @ApiResponse({
    status: 200,
    description: 'Employee added successfully',
    type: CreateEmployeeDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to add the employee',
  })
  async addSkillsToEmployee(
    @Res() response,
    @Body() addSkillsEmployeeDto: AddSkillsEmployeeDto,
  ) {
    this.logger.debug(
      'In the service: EmployeeController.name \t method: addSkillsToEmployee.name',
    );
    try {
      const newEmployee =
        await this.employeeService.addSkillsToEmployee(addSkillsEmployeeDto);
      // console.log(" Returned from the service method", newEmployee);
      return response.status(HttpStatus.CREATED).json({
        message: 'Employee has been added successfully',
        newEmployee,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Employee not Created!',
        error: 'Bad Request',
      });
    }
  }

  @Put(':EmployeeName')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Update the employee record of specified name)',
  })
  @ApiResponse({
    status: 200,
    description: 'Employee updated successfully',
    type: UpdateEmployeeDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to update the employee',
  })
  async updateEmployee(
    @Res() response,
    @Param('EmployeeName') EmployeeName: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    this.logger.debug(
      'In the service: EmployeeController.name \t method: updateEmployee.name',
    );
    try {
      const existingEmployee = await this.employeeService.updateEmployee(
        EmployeeName,
        updateEmployeeDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Employee has been successfully updated',
        existingEmployee,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Employee Not Updated!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/UpdateScore')
  @Roles(Role.Admin)
  @ApiBody({ type: UpdateEmployeeDto })
  @ApiOperation({
    summary: 'Update the score of the employee)',
  })
  @ApiResponse({
    status: 200,
    description: 'Score updated successfully',
    type: UpdateEmployeeDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to update the score',
  })
  async updateScore(
    @Res() response,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    this.logger.debug(
      'In the service: EmployeeController.name \t method: updateScore.name',
    );
    try {
      const existingSkill =
        await this.employeeService.updateScore(updateEmployeeDto);
      return response.status(HttpStatus.OK).json({
        message: 'Employee has been successfully updated',
        existingSkill,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Skill Not Updated!',
        error: 'Bad Request',
      });
    }
  }

  @Get('AllskilledEmployees')
  @ApiOperation({
    summary: 'Get all Employees of matching skill',
  })
  @ApiResponse({
    status: 200,
    description: 'Employees fetched successfully',
    type: GetMatchedEmployeeAllSkillsResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Employees not found',
  })
  async getAllSkilledEmployees(@Res() response) {
    this.logger.debug(
      'In the service: EmployeeController.name \t method: getAllSkilledEmployees.name',
    );
    try {
      // console.log('In the controller method: getAllSkilledEmployees.name');
      const data: GetMatchedEmployeeAllSkillsResponse[] =
        await this.employeeService.getAllSkilledEmployees();
      return response.status(HttpStatus.OK).json({ data });
    } catch (err) {
      return response.status(HttpStatus.OK).json(err);
    }
  }

  @Post('skilledEmployees')
  @ApiOperation({
    summary: 'Get all Employees of matching skill',
  })
  @ApiResponse({
    status: 200,
    description: 'Employees fetched successfully',
    type: GetMatchedEmployeeSkillsResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Employees not found',
  })
  async getSkilledEmployees(
    @Body() skillSelectionDto: SkillSelectionDto,
    @Res() response,
  ) {
    this.logger.debug(
      'In the service: EmployeeController.name \t method: getSkilledEmployees.name',
    );
    try {
      // console.log('In the controller method: getMatchedEmployees.name');
      // console.log('In the controller method: getMatchedEmployees.name : empSkill:', empSkill);
      const data: GetMatchedEmployeeSkillsResponse =
        await this.employeeService.getSkilledEmployees(skillSelectionDto);
      return response.status(HttpStatus.OK).json({ data });
    } catch (err) {
      return response.status(err).json(err);
    }
  }

  @Get('list')
  @ApiOperation({
    summary: 'Get the list of Employees of matching skill',
  })
  @ApiResponse({
    status: 200,
    description: 'Employees fetched successfully',
    type: GetMatchedEmployeeSkillsResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Employees not found',
  })
  async getMatchedEmployees(
    @Query('empSkill') empSkill: string,
    @Res() response,
  ) {
    this.logger.debug(
      'In the service: EmployeeController.name \t method: getMatchedEmployees.name',
    );
    try {
      // console.log('In the controller method: getMatchedEmployees.name');
      // console.log('In the controller method: getMatchedEmployees.name : empSkill:', empSkill);
      const data: GetMatchedEmployeeSkillsResponse =
        await this.employeeService.getMatchedEmployees(empSkill);
      return response.status(HttpStatus.OK).json({ data });
    } catch (err) {
      return response.status(err).json(err);
    }
  }

  @Get('Skills')
  @ApiOperation({
    summary: 'Get all Employees of matching skill',
  })
  @ApiResponse({
    status: 200,
    description: 'Employees fetched successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Employees not found',
  })
  async getEmployeeOfSkills(@Query('skill') skill: string, @Res() response) {
    this.logger.debug(
      'In the service: EmployeeController.name \t method: getEmployeeOfSkills.name',
    );
    try {
      const data = await this.employeeService.getEmployeesOfSkill(skill);
      return response.status(HttpStatus.OK).json({ data });
    } catch (err) {
      return response.status(err).json(err);
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get all Employee data',
  })
  @ApiResponse({
    status: 200,
    description: 'Employees fetched successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Employees not found',
  })
  async getEmployees(@Res() response) {
    this.logger.debug(
      'In the service: EmployeeController.name \t method: getEmployees.name',
    );
    try {
      const EmployeeData = await this.employeeService.getAllEmployees();
      return response.status(HttpStatus.OK).json({
        message: 'All Employees data found successfully',
        EmployeeData,
      });
    } catch (err) {
      return response.status(err).json(err);
    }
  }

  @Get(':EmployeeName')
  @ApiOperation({
    summary: 'Get specified Employee data',
  })
  @ApiResponse({
    status: 200,
    description: 'Employee data fetched successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Employee not found',
  })
  async getEmployee(
    @Res() response,
    @Param('EmployeeName') EmployeeName: string,
  ) {
    this.logger.debug(
      'In the service: EmployeeController.name \t method: getEmployee.name',
    );
    try {
      const existingEmployee =
        await this.employeeService.getEmployee(EmployeeName);
      console.log('Existing employee:', existingEmployee);
      return response.status(HttpStatus.OK).json({
        message: 'Employee found successfully',
        existingEmployee,
      });
    } catch (err) {
      return response.status(err).json(err);
    }
  }

  @Delete(':EmployeeName')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Delete specified Employee record',
  })
  @ApiResponse({
    status: 200,
    description: 'Employee data deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Employee not found',
  })
  async deleteEmployee(
    @Res() response,
    @Param('EmployeeName') EmployeeName: string,
  ) {
    this.logger.debug(
      'In the service: EmployeeController.name \t method: deleteEmployee.name',
    );
    try {
      const deletedEmployee =
        await this.employeeService.deleteEmployee(EmployeeName);
      return response.status(HttpStatus.OK).json({
        message: 'Employee deleted successfully',
        deletedEmployee,
      });
    } catch (err) {
      return response.status(err).json(err);
    }
  }
}
