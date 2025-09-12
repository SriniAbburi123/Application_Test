import { Body, Controller, Logger, HttpStatus, Param, Delete, Get, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../models/enums/roles.enum';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SkillService } from './skill.service';
import { CreateSkillDto, UpdateSkillDto } from './models/dtos/createSkill.dto';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Skill')
@UseGuards(RolesGuard)
@Controller('Skill')
export class SkillController {
  private readonly logger = new Logger(SkillController.name);
  constructor(private readonly skillService: SkillService) { }

  @Post('createSkill')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Add Skill in the database',
  })
  @ApiResponse({
    status: 200,
    description: 'Skill added successfully',
    type: CreateSkillDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to add the skill',
  })
  async createSkill(@Res() response, @Body() createSkillDto: CreateSkillDto) {
    try {
      const newSkill = await this.skillService.createSkill(createSkillDto);
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

  @Put('Update Skill')
  @Roles(Role.Admin)
  @ApiOperation({
    summary: 'Update specified Skill record',
  })
  @ApiResponse({
    status: 200,
    description: 'Skill data updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Skill not found',
  })
  async updateSkill(@Res() response, @Body() updateSkillDto: UpdateSkillDto){
    try {
      const updatedSkill = await this.skillService.updateSkill(updateSkillDto);
      return response.status(HttpStatus.OK).json({
      message: 'Skill updated successfully',
      updatedSkill});
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
      const deletedSkill = await this.skillService.deleteSkill(skill);
      return response.status(HttpStatus.OK).json({
      message: 'Skill deleted successfully',
      deletedSkill,});
    }catch (err) {
      return response.status(err).json(err);
    }
  }

  @Get()
  @Roles(Role.User)
  @ApiOperation({
    summary: 'Get all Skill data',
  })
  @ApiResponse({
    status: 200,
    description: 'Skills fetched successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Skills not found',
  })
  async getAllSkills(@Res() response) {
    try {
      const skillData = await this.skillService.getAllSkills();
      return response.status(HttpStatus.OK).json({
      message: 'All Employees data found successfully',skillData});
    } catch (err) {
      return response.status(err).json(err);
    }
  }
}

