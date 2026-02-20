import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findAll() {
    return this.userModel.find().select('-password');
  }
  async update(id: string, body: any) {
    console.log('ok')
    const user = await this.userModel.findByIdAndUpdate(id, body).select('-password');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

}
