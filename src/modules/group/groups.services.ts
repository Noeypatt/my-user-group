import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Group } from './schema/group.schema';

@Injectable()
export class GroupsService {
  constructor(
    @Inject('GROUP_MODEL')
    private readonly groupModel: Model<Group>,
  ) {}

  async findAll(): Promise<Group[]> {
    return this.groupModel.find().exec();
  }
}
