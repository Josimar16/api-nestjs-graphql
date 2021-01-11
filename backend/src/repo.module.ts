import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';
import User from './db/entities/User';
import Message from './db/entities/Message';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Message])],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;
