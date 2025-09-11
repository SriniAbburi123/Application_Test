import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from '../modules/employee/employee.service';

@Injectable()
export class AuthService {
  constructor(
    private employeeService: EmployeeService,
    private jwtService: JwtService,
  ) {}

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