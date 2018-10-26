import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { Config } from '../config';
import { AuthGuard } from '@nestjs/passport';

import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
@Controller(`${Config.preUrl}/users`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
