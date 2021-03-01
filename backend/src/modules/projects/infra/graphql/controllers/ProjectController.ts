import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO.input';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import { Injectable } from '@nestjs/common';
import Project from '../../typeorm/entities/Project';

@Injectable()
export default class ProjectController {
  constructor(
    private readonly createProjectService: CreateProjectService,
  ) {}

  // Controller para criar um projeto, recebe o resolver, chama o service e retorna um projeto
  public async create(data: ICreateProjectDTO): Promise<Project> {
    const project = await this.createProjectService.execute(data);

    return project;
  }
}
