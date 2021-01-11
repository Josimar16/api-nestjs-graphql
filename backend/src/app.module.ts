import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as ormOptions from './config/orm';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
