import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO.input';
import { Inject } from '@nestjs/common';
import { Resolver, Args, Mutation, Query, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import Project from '../../typeorm/entities/Project';
import ProjectController from '../controllers/ProjectController';
export const pubSub = new PubSub();

@Resolver(() => Project)
export default class ProjectResolver {
  // Injeção do controller de projeto, é preciso colocar no provider do modulo
  @Inject()
  private readonly projectController: ProjectController;

  @Mutation(() => Project, { description: 'Mutation para criar um projeto' })
  public async createProject(
    @Args('data', {
      description: "Recebe um argumento 'data' do tipo ICreateProjectDTO",
    })
    data: ICreateProjectDTO,
  ): Promise<Project> {
    const project = await this.projectController.create(data);
    // Publish um projeto para a subscription verificar a mudança
    pubSub.publish('projectAdded', { projectAdded: project });
    return project;
  }

  @Subscription(() => Project, {
    description: 'Subscription para retornar novos projetos criados',
  })
  projectAdded() {
    return pubSub.asyncIterator('projectAdded');
  }

  @Query(() => Boolean, { description: 'Retorna uma Boolean' })
  public async findProject(): Promise<Boolean> {
    return true;
  }
}
