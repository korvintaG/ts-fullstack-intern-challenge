import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Response } from 'express';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto, res:Response) {
    const user = this.userRepository.create(createUserDto);
    const salt = randomBytes(8).toString('hex');
    const hashedPassword = await this.hashPasswordWithSalt(user.password, salt);
    const newUser = { ...user, password: `${salt}.${hashedPassword}` };
    return this.userRepository.save(newUser);
  }

  private async hashPasswordWithSalt(
    password: string,
    salt: string,
  ): Promise<string> {
    return ((await scrypt(password, salt, 32)) as Buffer).toString('hex');
  }


}
