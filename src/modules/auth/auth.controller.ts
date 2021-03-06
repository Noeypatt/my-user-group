import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { UsersService } from '../user/users.services';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async signup(@Res() res, @Body() body) {
    try {
      if (!body.email) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'email is require.' });
      }
      if (!body.username) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'username is require.' });
      }
      if (!body.password) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'password is require.' });
      }

      const user = await this.usersService.findUser({ email: body.email });
      if (user) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: 'This email already has a user.' });
      } else {
        const encryptPassword = await this.usersService.hash(body.password);
        delete body.password;
        const data = {
          ...body,
          password: encryptPassword,
        };
        const result = await this.usersService.create(data);
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

  @Post('/login')
  async login(@Res() res, @Request() req) {
    try {
      const user = await this.usersService.findUser({
        username: req.body.username,
      });

      if (!user) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'user not found.' });
      }

      const comparePassword = await this.authService.comparePassword(
        req.body.password,
        user.password,
      );

      if (!comparePassword) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'password wrong.' });
      }

      const result = await this.authService.jwtSignToken(user);

      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error?.message });
    }
  }
}
