import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from '../user/users.services';

@Controller()
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async signup(@Res() res, @Body() body) {
    try {
      const result = await this.usersService.create(body);
      if (result) {
        return res
          .status(HttpStatus.CREATED)
          .json({ message: 'signup success' });
      }
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error?.message });
    }
  }

  @Post('/login')
  async login() {
    try {
    } catch (error) {}
  }

  @Post('/logout')
  async logout() {
    try {
    } catch (error) {}
  }
}
