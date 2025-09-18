import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill } from './models/schemas/SkillSchema';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';
import { SkillSchema } from './models/schemas/SkillSchema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
  ],
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService],
})
export class SkillModule {}
