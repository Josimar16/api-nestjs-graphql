import { Injectable } from '@nestjs/common';
import Project from '../infra/typeorm/entities/Project';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO.input';
import ProjectRepository from '../infra/typeorm/repositories/ProjectRepository';

@Injectable()
export default class CreateProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}
  // Única função do service para executar as ações do DB, como também toda a regra de negócio
  public async execute(data: ICreateProjectDTO): Promise<Project> {
    const project = await this.projectRepository.create(data);

    return project;
  }
}
