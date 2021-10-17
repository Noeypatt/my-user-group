import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as hasha from 'hasha';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async comparePassword(
    password: string,
    encryptPassword: string,
  ): Promise<boolean> {
    const hashPassword = await hasha.async(password);
    return encryptPassword === hashPassword;
  }

  async jwtSignToken(user: any) {
    const payload = { username: user.username, sub: user._id };
    const data = {
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
      access_token: this.jwtService.sign(payload),
    };
    return data;
  }
}
