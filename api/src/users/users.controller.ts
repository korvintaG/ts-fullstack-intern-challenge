import {
  Controller,
  Post,
  Res,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }


  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    return this.usersService.create(createUserDto, res);
  }

}
