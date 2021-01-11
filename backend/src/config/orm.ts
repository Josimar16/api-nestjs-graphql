import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/mural_mensagens.db',
  logging: true,
  entities: [path.resolve(__dirname, '..', 'db', 'entities', '*.ts')],
  migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*.ts')],
}

module.exports = options;