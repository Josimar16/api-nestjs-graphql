import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProjectController from './infra/graphql/controllers/ProjectController';
import ProjectResolver from './infra/graphql/resolvers/project.resolver';
import ProjectRepository from './infra/typeorm/repositories/ProjectRepository';
import CreateProjectService from './services/CreateProjectService';
import Project from './infra/typeorm/entities/Project';
@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [
    // Projeto
    // Resolver
    ProjectResolver,
    // Controller
    ProjectController,
    // Service
    CreateProjectService,
    // Repository
    ProjectRepository,
  ],
  exports: [
    // Projeto
    CreateProjectService,
  ],
})
export class ProjectsModule {}
