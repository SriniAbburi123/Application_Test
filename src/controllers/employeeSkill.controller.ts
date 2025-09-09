import { Body, Controller, Logger, Delete, Get, Query, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Injectable, PipeTransform, NotFoundException, BadRequestException } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../models/enums/roles.enum';
import { isValidObjectId } from 'mongoose';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmployeeSkillService } from '../services/employeeSkill.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../models/dtos/createEmployee.dto';
import { CreateSkillDto, UpdateSkillDto } from '../models/dtos/createSkill.dto';
import { 
  GetMatchedEmployeeSkillsResponse
 } from '../models/dtos/get-matched-employee-skills-response.dto';
import { PostMatchedEmployeeDto } from '../models/dtos/post-matched-employee.dto';
import {GetMatchedEmployeeAllSkillsResponse}  from '../models/dtos/get-matched-employee-skills-response.dto';
import { AddSkillsEmployeeDto } from 'src/models/dtos/addSkillToEmployee.dto';

@ApiTags('Application')
@Controller('Application')
export class EmployeeSkillController {
  private readonly logger = new Logger(EmployeeSkillController.name);
  constructor(private readonly employeeSkillService: EmployeeSkillService) { }
  @Post('createEmployee')
  @Roles(Role.Admin)
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
  async createEmployee(@Res() response, @Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      const newEmployee = await this.employeeSkillService.createEmployee(createEmployeeDto);
      // console.log(" Returned from the service method", newEmployee);
      return response.status(HttpStatus.CREATED).json({
        message: 'Employee has been added successfully',
        newEmployee});
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: 400,
      message: 'Error: Employee not Created!',
      error: 'Bad Request'
      });
    }
  }

  @Post('createSkill')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Add Skill in the database',
  })
  @ApiResponse({
    status: 200,
    description: 'Skill added successfully',
    type: CreateEmployeeDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to add the skill',
  })
  async createSkill(@Res() response, @Body() createSkillDto: CreateSkillDto) {
    try {
      const newSkill = await this.employeeSkillService.createSkill(createSkillDto);
      // console.log(" Returned from the service method", newEmployee);
      return response.status(HttpStatus.CREATED).json({
        message: 'Skill has been added successfully',
        newSkill});
    } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Skill not Created!',
        error: 'Bad Request'
        });
    }
  }

  @Post('AddSkillsToEmployee')
  @Roles(Role.Admin)
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
  async addSkillsToEmployee(@Res() response, @Body() addSkillsEmployeeDto:AddSkillsEmployeeDto) {
    try {
      const newEmployee = await this.employeeSkillService.addSkillsToEmployee(addSkillsEmployeeDto);
      // console.log(" Returned from the service method", newEmployee);
      return response.status(HttpStatus.CREATED).json({
        message: 'Employee has been added successfully',
        newEmployee});
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: 400,
      message: 'Error: Employee not Created!',
      error: 'Bad Request'
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
  async updateEmployee(@Res() response,@Param('EmployeeName') EmployeeName: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const existingEmployee = await this.employeeSkillService.updateEmployee(EmployeeName, updateEmployeeDto);
      return response.status(HttpStatus.OK).json({
      message: 'Employee has been successfully updated',
      existingEmployee,});
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: 400,
      message: 'Error: Employee Not Updated!',
      error: 'Bad Request'
      });
    }
  }

  @Put(':SkillName')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Update the specified skill record)',
  })
  @ApiResponse({
    status: 200,
    description: 'Skill updated successfully',
    type: UpdateEmployeeDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to update the skill',
  })
  async updateSkill(@Res() response, @Param('SkillName') skillName: string, @Body() updateSkillDto: UpdateSkillDto) {
    try {
      const existingSkill = await this.employeeSkillService.updateEmployee(skillName, UpdateSkillDto);
      return response.status(HttpStatus.OK).json({
      message: 'Employee has been successfully updated',
      existingSkill,});
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: 400,
      message: 'Error: Skill Not Updated!',
      error: 'Bad Request'
      });
    }
  }

  @Put('/UpdateScore')
  @Roles(Role.Admin)
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
  async updateScore(@Res() response, updateEmployeeDto:UpdateEmployeeDto) {
    try {
      const existingSkill = await this.employeeSkillService.updateScore(updateEmployeeDto);
      return response.status(HttpStatus.OK).json({
      message: 'Employee has been successfully updated',
      existingSkill,});
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: 400,
      message: 'Error: Skill Not Updated!',
      error: 'Bad Request'
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
  async getAllSkilledEmployees( @Res() response) {
    try {
      // console.log('In the controller method: getAllSkilledEmployees.name');
      const data: GetMatchedEmployeeAllSkillsResponse[] = await this.employeeSkillService.getAllSkilledEmployees();
      return response.status(HttpStatus.OK).json({data});
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
  async getSkilledEmployees(@Body() postMatchEmployeeDto:PostMatchedEmployeeDto, @Res() response) {
    try {
      // console.log('In the controller method: getMatchedEmployees.name');
      // console.log('In the controller method: getMatchedEmployees.name : empSkill:', empSkill);
      const data: GetMatchedEmployeeSkillsResponse = await this.employeeSkillService.getSkilledEmployees(postMatchEmployeeDto);
      return response.status(HttpStatus.OK).json({data});
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
  async getMatchedEmployees(@Query('empSkill') empSkill:string, @Res() response) {
    try {
      // console.log('In the controller method: getMatchedEmployees.name');
      // console.log('In the controller method: getMatchedEmployees.name : empSkill:', empSkill);
      const data: GetMatchedEmployeeSkillsResponse = await this.employeeSkillService.getMatchedEmployees(empSkill);
      return response.status(HttpStatus.OK).json({data});
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
  async getEmployeeOfSkills(@Query('skill') skill:string,  @Res() response) {
    try {
      const data = await this.employeeSkillService.getEmployeesOfSkill(skill);
      return response.status(HttpStatus.OK).json({data});
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
    try {
      const EmployeeData = await this.employeeSkillService.getAllEmployees();
      return response.status(HttpStatus.OK).json({
      message: 'All Employees data found successfully',EmployeeData});
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
  async getEmployee(@Res() response, @Param('EmployeeName') EmployeeName: string) {
    try {
      const existingEmployee = await this.employeeSkillService.getEmployee(EmployeeName);
      console.log('Existing employee:', existingEmployee);
      return response.status(HttpStatus.OK).json({
      message: 'Employee found successfully',existingEmployee,});
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
  async deleteEmployee(@Res() response, @Param('EmployeeName') EmployeeName: string){
    try {
      const deletedEmployee = await this.employeeSkillService.deleteEmployee(EmployeeName);
      return response.status(HttpStatus.OK).json({
      message: 'Employee deleted successfully',
      deletedEmployee,});
    }catch (err) {
      return response.status(err).json(err);
    }
  }

  @Delete(':skill')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Delete specified Skill record',
  })
  @ApiResponse({
    status: 200,
    description: 'Skill data deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Skill not found',
  })
  async deleteSkill(@Res() response, @Param('Skill') skill: string){
    try {
      const deletedEmployee = await this.employeeSkillService.deleteSkill(skill);
      return response.status(HttpStatus.OK).json({
      message: 'Employee deleted successfully',
      deletedEmployee,});
    }catch (err) {
      return response.status(err).json(err);
    }
  }
}

