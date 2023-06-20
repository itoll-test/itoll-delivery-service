import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    //TODO:This block should consider role at login time in beside current password.
    //Because each user has only one role when login.
    //For simplicity ignored.
    if (user && user.password === pass) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: any) {
    let payload: any;
    if (user.roles.includes(Role.Business)) {
      payload = {
        username: user.username,
        sub: user.userId,
        webhook: user.webhook,
        roles: user.roles,
      };
    } else {
      payload = {
        username: user.username,
        sub: user.userId,
        roles: user.roles,
      };
    }

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
