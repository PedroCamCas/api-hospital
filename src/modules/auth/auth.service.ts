import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async generatedToken(userAuth) {
    const payload = { sub: userAuth.id, email: userAuth.email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
