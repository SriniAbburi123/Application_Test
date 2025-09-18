import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import type { HydratedDocument } from 'mongoose';
export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee extends Document {
  @Prop({ type: String, isRequired: true, unique: true })
  Name: string;
  @Prop({ type: String })
  Position: string;
  // @Prop({ type: Schema.Types.ObjectId, ref: 'Skill'})
  @Prop({ type: String, ref: 'Skill' })
  Skills: [string];
  @Prop({ type: String })
  Email: string;
  @Prop({ type: Date })
  HireDate: Date;
  @Prop({ type: String, isRequired: true })
  Password: string;
  @Prop({ type: Number })
  EngagementScore: number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
