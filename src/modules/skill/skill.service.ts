import { Injectable, Logger,PipeTransform, NotFoundException, InternalServerErrorException, BadRequestException, ConflictException, Get } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Skill } from './models/schemas/SkillSchema';
import { CreateSkillDto, UpdateSkillDto } from './models/dtos/createSkill.dto';
@Injectable()
export class SkillService {
  private readonly logger = new Logger(SkillService.name);
  constructor(@InjectModel('Skill') private skillModel:Model<Skill>){ }
   
  // Create the skill in mongo db.
  async createSkill(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skillName = createSkillDto.name;
    const existingSkill = await this.skillModel.findOne({ Name: skillName }).exec();
    this.logger.debug("createSkill: Skill Data:", existingSkill);
    // Return null if skill already exists
    if (existingSkill) {
      this.logger.error("createSkill: Skill already exists");
      return null;
    }
    const newSkill = new this.skillModel(createSkillDto);
    this.logger.debug("createSkill: Added Skill Data:", newSkill);
    return newSkill.save();
  }

  // Update the Skill in db.
   async updateSkill(updateSkillDto: UpdateSkillDto): Promise<Skill> {
     const skillName = updateSkillDto.name;
     const filter = {name: skillName};
     const existingSkill = await this.skillModel.findOneAndUpdate(filter, updateSkillDto, { new: true }).exec();
     if (!existingSkill) {
       this.logger.error(`updateSkill: Skill #${skillName} not found`);
       return null;
     }
     return existingSkill;
  }
  
  // Delete the specific skill from collection.
  async deleteSkill(skill: string): Promise<Skill> {
    const filter = {Name: skill};
    const deletedSkill = await this.skillModel.findOneAndDelete(filter).exec();
    if (!deletedSkill) {
      this.logger.error(`deleteSkill: Skill #${skill} not found`);
      return null;
    } 
    return deletedSkill;
  }

  // Get all the data from the Employee collection.
    async getAllSkills(): Promise<Skill[]> {
      const skillData = await this.skillModel.find().exec();
      if (!skillData || skillData.length == 0) {
        this.logger.error('getAllEmployees: Employees data not found!');
      }
      return skillData;
    }
  
}