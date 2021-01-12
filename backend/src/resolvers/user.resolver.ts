import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import User from 'src/db/entities/User';
import RepoService from 'src/repo.service';
import UserInput from './input/user.input';

@Resolver()
export default class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [User])
  public async users(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  @Query(() => User, { nullable: true })
  public async user(@Args('id') id: number): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  @Mutation(() => User)
  public async createUser(
    @Args('data') { name, email }: UserInput,
  ): Promise<User> {
    const user = this.repoService.userRepo.create({ name, email });
    return await this.repoService.userRepo.save(user);
  }
}
