import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.services';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUser(@Res() res) {
    try {
      const result = await this.usersService.findAll();
      if (result) {
        return res.status(HttpStatus.OK).json({ data: result });
      }
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: error?.message });
    }
  }

  @Get(':id')
  async findOneUser(@Res() res, @Param('id') id) {
    try {
      const result = await this.usersService.findOne(id);
      if (result) {
        return res.status(HttpStatus.OK).json({ data: result });
      }
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: error?.message });
    }
  }
}
