import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { GroupProviders } from './group.provider';
import { GroupController } from './groups.controller';
import { GroupsService } from './groups.services';

@Module({
  imports: [DatabaseModule],
  controllers: [GroupController],
  providers: [GroupsService, ...GroupProviders],
  exports: [GroupsService],
})
export class GroupModule {}
