import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';
import { UsersService } from './users.services';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUser(@Res() res) {
    try {
      const result = await this.usersService.findAll();
      if (result) {
        return res.status(HttpStatus.OK).json({ data: result });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'not found.' });
      }
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error?.message });
    }
  }

  @Get(':id')
  async findByUserID(@Res() res, @Param('id') id) {
    try {
      const result = await this.usersService.findByUserID(id);
      if (result) {
        return res.status(HttpStatus.OK).json({ data: result });
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'not found.' });
      }
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error?.message });
    }
  }

  @Put(':id')
  async update(@Res() res, @Param('id') id, @Body() body) {
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
        const result = await this.usersService.update(id, data);
        if (result) {
          return res.status(HttpStatus.OK).json({ message: 'update success' });
        }
      }
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error?.message });
    }
  }

  @Delete(':id')
  async delete(@Res() res, @Param('id') id) {
    try {
      const result = await this.usersService.delete(id);
      if (result) {
        return res.status(HttpStatus.OK).json({ message: 'delete success.' });
      }
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error?.message });
    }
  }
}
