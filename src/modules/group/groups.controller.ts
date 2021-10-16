import { Controller, Get } from '@nestjs/common';
import { GroupsService } from './groups.services';

@Controller()
export class GroupController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async findAll() {
    return this.groupsService.findAll();
  }
}
