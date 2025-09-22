import {
  Body,
  Controller,
  Logger,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('auth/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/logout')
  async logout(@Request() req) {
    return req.logout();
  }
}
