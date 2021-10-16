import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../user/users.services';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../../guard/local-auth.guard';

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async signup(@Res() res, @Body() body) {
    try {
      const user = await this.usersService.findUser({ email: body.email });
      if (user) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: 'This email already has a user.' });
      } else {
        const result = await this.usersService.create(body);
        if (result) {
          return res
            .status(HttpStatus.CREATED)
            .json({ message: 'signup success' });
        }
      }
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error?.message });
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Res() res, @Request() req) {
    try {
      const result = await this.authService.login(req.user);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error?.message });
    }
  }

  @Post('/logout')
  async logout(@Res() res) {
    try {
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error?.message });
    }
  }
}
