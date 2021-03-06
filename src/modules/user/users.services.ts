import { Model, Types } from 'mongoose';
import * as hasha from 'hasha';
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
    return this.userModel
      .findOne({
        username: user.username,
      })
      .select(['-createdAt', '-updatedAt'])
      .exec();
  }
  async update(id: string, body): Promise<any | undefined> {
    return this.userModel.findByIdAndUpdate({ _id: id }, body, { new: true });
  }
  async delete(id: string): Promise<any | undefined> {
    return this.userModel.findByIdAndDelete({ _id: id });
  }
  async hash(password: string) {
    return await hasha.async(password);
  }
}
