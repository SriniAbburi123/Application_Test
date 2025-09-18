import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private logger: Logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { statusCode } = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap((data) => {
        this.logger.log(
          `Status[${statusCode}] ResponseBody-Type[${typeof data}]`,
        );
      }),
    );
  }
}
