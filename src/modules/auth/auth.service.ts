import { Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from '../employee/employee.service';
import { LoggerService } from 'src/utils/loggerModule/logger.service';
import { Roles } from './decorators/roles.decorator';

export class AuthService {
  private readonly logger = new LoggerService();
  constructor(
    private jwtService: JwtService,
    @Inject(EmployeeService)
    private readonly employeeService: EmployeeService,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async signIn(username: string, pass: string): Promise<any> {
    console.log("User name: " + username + " Password: " + pass);
    const user = await this.employeeService.getEmployee(username);
  
    if (user.Password !== pass) {
      throw new UnauthorizedException();
    }
    
    console.log("User name: " + user.Name + "Email:" + user.Email + "Role:" + user.Roles + "Position:" + user.Position);
    // const payload = { username: user.Name, sub: user._id };
    const payload = { username: user.Name, roles: user.Roles, email: user.Email, position: user.Position };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
