import {
  Query,
  Args,
  Mutation,
  Resolver,
  ResolveProperty,
} from '@nestjs/graphql';
import Message from 'src/db/entities/Message';
import RepoService from 'src/repo.service';
import MessageInput from './input/message.input';

@Resolver()
export default class MessageResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Message])
  public async Messages(): Promise<Message[]> {
    return this.repoService.messageRepo.find();
  }

  @Query(() => Message, { nullable: true })
  public async Message(@Args('id') id: number): Promise<Message> {
    return this.repoService.messageRepo.findOne(id);
  }

  @Mutation(() => Message)
  public async createMessage(
    @Args('data') { user_id, title, content }: MessageInput,
  ): Promise<Message> {
    const message = this.repoService.messageRepo.create({
      user_id,
      title,
      content,
    });
    return await this.repoService.messageRepo.save(message);
  }
}
