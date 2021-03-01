import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO.input';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import {
  EntityManager,
  EntityRepository,
  Repository,
} from 'typeorm';
import Project from '../entities/Project';

// Repositorio do typeorm para realizar as querys em cima da entidade projeto
@EntityRepository(Project)
export default class ProjectRepository implements IProjectsRepository {
  private readonly ormRepository: Repository<Project>;

  constructor(manager: EntityManager) {
    this.ormRepository = manager.getRepository(Project);
  }

  // Função para criar um projeto no DB
  public async create({
    name,
    description,
  }: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create({
      name,
      description,
    });
    await this.ormRepository.save(project);
    return project;
  }
}
