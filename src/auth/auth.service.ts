import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeSkillService } from '../services/employeeSkill.service';

@Injectable()
export class AuthService {
  constructor(
    private employeeSkillService: EmployeeSkillService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.employeeSkillService.getEmployee(username);
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