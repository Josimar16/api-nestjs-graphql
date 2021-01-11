import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as ormOptions from './config/orm';
import RepoModule from './repo.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormOptions), RepoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
