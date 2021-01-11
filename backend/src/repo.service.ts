import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Message from './db/entities/Message';
import User from './db/entities/User';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Message) public readonly messageRepo: Repository<Message>,
  ) {}
}

export default RepoService;