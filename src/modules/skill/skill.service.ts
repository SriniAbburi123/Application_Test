import { Injectable, Logger,PipeTransform, NotFoundException, InternalServerErrorException, BadRequestException, ConflictException, Get } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Skill } from '../../models/schemas/SkillSchema';
import { CreateSkillDto, UpdateSkillDto } from '../../models/dtos/createSkill.dto';
@Injectable()
export class SkillService {
  private readonly logger = new Logger(SkillService.name);
  constructor(@InjectModel('Skill') private skillModel:Model<Skill>){ }
   
  // Create the skill in mongo db.
  async createSkill(createSkillDto: CreateSkillDto): Promise<Skill> {
    const skillName = createSkillDto.name;
    const existingSkill = await this.skillModel.findOne({ Name: skillName }).exec();
    console.log("Skill Data:", existingSkill);
    if (existingSkill) {
      throw new ConflictException("Skill already exists");
    }
    const newSkill = new this.skillModel(createSkillDto);
    console.log("Created the skill");
    return newSkill.save();
  }

  // Update the Skill in db.
   async updateSkill(skillName: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
     const filter = {name: skillName};
     const existingSkill = await this.skillModel.findOneAndUpdate(filter, updateSkillDto, { new: true }).exec();
     if (!existingSkill) {
       this.logger.error(`Skill #${skillName} not found`);
     }
     return existingSkill;
  }
  
  // Delete the specific skill from collection.
  async deleteSkill(skill: string): Promise<Skill> {
    const filter = {Name: skill};
    const deletedSkill = await this.skillModel.findOneAndDelete(filter).exec();
    if (!deletedSkill) {
      this.logger.error(`Skill #${skill} not found`);
    } 
    return deletedSkill;
  }
}