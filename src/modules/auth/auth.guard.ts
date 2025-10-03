import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug(` In ` + this.canActivate.name + '. Authenticating user');

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    this.logger.debug(' Authorization Token: ' + token);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      this.logger.debug(` Route is public, continuing without authorizing`);
      if (token) {
        try {
          this.logger.debug(`Attempting to verify token if available`);
          const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET,
          });
          this.logger.log(` User Authentication successful. Payload: [Name: ${payload.username}, Email: ${payload.email}, Roles: ${payload.roles}, Position: ${payload.position}]`,
      );
          request['user'] = payload;
          this.logger.debug(`Token decoded successfully.`);
        } catch (error: unknown) {
          this.logger.debug(
            `Failed to verify token. Message: ${error}. Returning true`,
          );
        }
      }
      // 💡 See this condition
      return true;
    }

    if (!token) {
      this.logger.error(' Failed to extract access token from request header');
      // throw new UnauthorizedException(this.authService.convertLang('errors.auth.token', lang));
      throw new UnauthorizedException();
    }
    try {
      // this.logger.debug(' Authorization Token: ' + token);
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      this.logger.debug("User payload: " + payload);
      request['user'] = payload;
      this.logger.log(
        ` User Authentication successful. Payload: [Name: ${payload.username}, Email: ${payload.email}, Roles: ${payload.roles}, Position: ${payload.position}]`,
      );
    } catch (error: unknown) {
      this.logger.error(
        ` Caught inside Auth Guard. Failed to authenticate user. Message: ${error}`,
      );
      throw new UnauthorizedException();
      // throw new UnauthorizedException(this.authService.convertLang('errors.auth.token', lang));
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}