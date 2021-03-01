import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './modules/projects/projects.module';

import * as ormOptions from '@shared/infra/typeorm';

@Module({
  imports: [
    // Inicializando arquivo de configuração do DB
    TypeOrmModule.forRoot(ormOptions),
    // Inicializando GraphQL, arquivo dos schemas e subscriptions
    GraphQLModule.forRoot({
      useGlobalPrefix: true,
      autoSchemaFile: 'schema.gql',
      playground: true,
      debug: true,
      tracing: true,
      installSubscriptionHandlers: true,
    }),
    // Inicializando todos os módulos
    ProjectsModule,
  ],
})
export class AppModule {}
