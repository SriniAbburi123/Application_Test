import { Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from '../employee/employee.service';
import { LoggerService } from 'src/utils/loggerModule/logger.service';

export class AuthService {
  private readonly logger = new LoggerService();
  constructor(
    private jwtService: JwtService,
    private readonly employeeService:EmployeeService) {
      this.logger.setContext(AuthService.name);
  }

  async signIn(username: string, pass: string) {
    const user = await this.employeeService.getEmployee(username);
    if (user.Password !== pass) {
      throw new UnauthorizedException();
    }
    // const payload = { username: user.Name, sub: user._id };
    const payload = { username: user.Name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}