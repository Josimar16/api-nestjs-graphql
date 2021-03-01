import { Test, TestingModule } from '@nestjs/testing';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO.input';
import ProjectRepository from '../infra/typeorm/repositories/ProjectRepository';
import CreateProjectService from './CreateProjectService';

// teste para criar projeto
describe('CreateProjectService', () => {
  let createProjectService: CreateProjectService;

  // Criando DTO fake para testes
  const project: ICreateProjectDTO = {
    name: 'Projeto',
    description: 'Projeto',
  };

  // Mocando os methods do repostiory
  const mockRepository = {
    create: jest.fn().mockReturnValue(project),
  };

  // Inicializando module do teste e suas dependencias
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProjectService,
        ProjectRepository,
        { provide: ProjectRepository, useValue: mockRepository },
      ],
    }).compile();

    createProjectService = module.get<CreateProjectService>(
      CreateProjectService,
    );
  });

  // Teste de criar novo projeto
  it('should be able create new project.', async () => {
    // Executando method do service
    const projectCreated = await createProjectService.execute(project);
    // Verificando se o retorno do mock é o object fake
    expect(projectCreated).toMatchObject(project);
    // Verificando se o mock foi chamado uma vez
    expect(mockRepository.create).toBeCalledTimes(1);
  });
});
