import { Model, Types } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<User>,
  ) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
  async findAll(): Promise<User[]> {
    return this.userModel
      .aggregate([{ $project: { username: 1, email: 1 } }])
      .exec();
  }
  async findByUserID(id: string): Promise<any | undefined> {
    return this.userModel.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      { $project: { username: 1, email: 1 } },
      { $limit: 1 },
    ]);
  }
  async findUser(user: {
    email?: string;
    username?: string;
  }): Promise<any | undefined> {
    return this.userModel.findOne({
      username: user.username,
    });
  }
}
