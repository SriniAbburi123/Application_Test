import { Body, Controller, Logger, Delete, Get, Query, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../models/enums/roles.enum';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SkillService } from './skill.service';
import { CreateSkillDto, UpdateSkillDto } from '../../models/dtos/createSkill.dto';

@ApiTags('Skill')
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
}

