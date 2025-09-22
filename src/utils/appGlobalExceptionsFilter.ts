import { Catch, ExceptionFilter } from '@nestjs/common';
import { SentryExceptionCaptured } from '@sentry/nestjs';
// import { Logger } from '@nestjs/common';
@Catch()
export class ApplicationGlobalExceptionFilter implements ExceptionFilter {
  // private readonly logger = new Logger(ApplicationGlobalExceptionFilter.name);
  @SentryExceptionCaptured()
  catch(exception:any, host:any): void {
    console.log(exception.message + 'from' +  host);
  }
}