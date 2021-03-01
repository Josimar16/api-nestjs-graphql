import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/*
  Arquivo de configuração do typeorm, para fazer a comunicação com o DataBase
*/
const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'teste',
  username: 'postgres',
  password: 'jj1010aa',
  logging: true,
  /**
   * @param __dirname
   * Com esse argumento, pega o caminho relativo da pasta ./src/shared/infra/typeorm/index.ts
   */
  entities: [
    path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'modules',
      '**',
      'infra',
      'typeorm',
      'entities',
      '*',
    ),
  ],
  migrations: [path.resolve(__dirname, 'migrations', '*')],
  synchronize: false,
};

module.exports = options;
