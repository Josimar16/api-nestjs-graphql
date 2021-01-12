import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import User from 'src/db/entities/User';
import RepoService from 'src/repo.service';
import UserInput from './input/user.input';

@Resolver(() => User)
export default class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  @Query(() => User, { nullable: true })
  public async getUser(@Args('id') id: string): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  @Mutation(() => User)
  public async createOrAuthenticatedUser(
    @Args('data') { name, email }: UserInput,
  ): Promise<User> {
    let user = await this.repoService.userRepo.findOne({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      user = this.repoService.userRepo.create({
        name,
        email: email.toLowerCase().trim(),
      });
      await this.repoService.userRepo.save(user);
    }

    return user;
  }
}
