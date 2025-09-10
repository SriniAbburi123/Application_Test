import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import * as crypto from 'crypto';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './modules/employee/employee.module';
import { EmployeeAnalyticsModule } from './modules//employee/employeeAnalytics.module';
import { SkillModule } from './modules/skill/skill.module';
import { EmployeeController } from './modules/employee/employee.controller';
import { LoggerMiddleware } from './utils/loggerModule/logger.middleware';
import { EmployeeSchema } from './models/schemas/EmployeeSchema';
import { SkillSchema } from './models/schemas/SkillSchema';

function getKey(key: string): Buffer {
  return crypto.createHash('sha256').update(key).digest();
}

function decrypt(text: string): string {
  const secretKey = process.env.SECRET_KEY || 'mongodburlencryptpasswordprovide';
  const [ivText, encryptedText] = text.split(':');
  const iv = Buffer.from(ivText, 'hex');
  const encrypted = Buffer.from(encryptedText, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', getKey(secretKey), iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  console.log(decrypted.toString(),"====================decrypted string");
  return decrypted.toString().trim();
}

@Module({imports: [
  EmployeeModule,
  SkillModule,
  EmployeeAnalyticsModule,
  MongooseModule.forRoot('mongodb://localhost:27017',{
  dbName: 'employeedb'}),
  MongooseModule.forFeature([
    { name: 'Employee', schema: EmployeeSchema},
    { name: 'Skill', schema: SkillSchema }
  ])
],
  controllers: [EmployeeController],
  providers: [
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,  
  },
  Logger,
  ],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}