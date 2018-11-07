import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User } from './interfaces/user.interface';
import { CreateUserDto } from '../auth/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    createUserDto.password = await this.getHash(createUserDto.password);

    const newUser = new this.userModel(createUserDto).save();

    delete newUser.password;
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOneById(id: number): Promise<User> {
    return await this.userModel.findOne({ id }).exec();
  }

  async findOneByEmail(email): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async getHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
