// External dependencies
import { ObjectId } from 'mongodb';

export interface IEmployee {
  name: string;
  position: string;
  skillIds: [string];
  email: string;
  hireDate: Date;
  password: string;
  engagementScore: number;
}
