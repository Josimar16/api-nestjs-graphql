import Project from '@modules/projects/infra/typeorm/entities/Project';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO.input';

// Interface para implementar methods no repository
export default interface IProjectsRepository {
  create(data: ICreateProjectDTO): Promise<Project>;
}
