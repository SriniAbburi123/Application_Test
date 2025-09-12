import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import type { HydratedDocument } from 'mongoose';
export type SkillDocument = HydratedDocument<Skill>;

@Schema()
export class Skill extends Document {
  @Prop({ type: String, isRequired: true, unique:true })
  Name: string;
  @Prop({ type: String })
  Description: string;
};

export const SkillSchema = SchemaFactory.createForClass(Skill);