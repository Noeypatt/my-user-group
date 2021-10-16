import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { GroupModule } from './modules/group/group.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, GroupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
