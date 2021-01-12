import {
  Query,
  Args,
  Mutation,
  Resolver,
  Parent,
  ResolveField,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import Message from 'src/db/entities/Message';
import User from 'src/db/entities/User';
import RepoService from 'src/repo.service';
import MessageInput, { DeleteMessageInput } from './input/message.input';

export const pubSub = new PubSub();

@Resolver(() => Message)
export default class MessageResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Message])
  public async getMessages(): Promise<Message[]> {
    return this.repoService.messageRepo.find();
  }

  @Query(() => Message, { nullable: true })
  public async getMessagesFromUser(
    @Args('user_id') user_id: string,
  ): Promise<Message[]> {
    return this.repoService.messageRepo.find({ where: { user_id } });
  }

  @Query(() => Message, { nullable: true })
  public async getMessage(@Args('id') id: string): Promise<Message> {
    return this.repoService.messageRepo.findOne(id);
  }

  @Mutation(() => Message)
  public async createMessage(
    @Args('data') { user_id, title, content }: MessageInput,
  ): Promise<Message> {
    const message = this.repoService.messageRepo.create({
      title,
      content,
      user_id,
    });
    const messageCreated = await this.repoService.messageRepo.save(message);

    pubSub.publish('messageAdded', { messageAdded: message });

    return messageCreated;
  }

  @Mutation(() => Boolean, { nullable: true })
  public async deleteMessage(
    @Args('data') { user_id, id }: DeleteMessageInput,
  ): Promise<boolean> {
    const message = await this.repoService.messageRepo.findOne(id);

    if (!message || message.user_id !== user_id) {
      return false;
    }

    const messageDeleted = await this.repoService.messageRepo.delete({
      id,
      user_id,
    });

    if (!messageDeleted) {
      return false;
    }

    return true;
  }

  @Subscription(() => Message)
  messageAdded() {
    return pubSub.asyncIterator('messageAdded');
  }

  @ResolveField(() => User, { name: 'user' })
  public async getUser(@Parent() parent: Message): Promise<User> {
    return this.repoService.userRepo.findOne(parent.user_id);
  }
}
