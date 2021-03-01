import { Field, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Interface que representa o payload de criação do projeto',
})
export default class ICreateProjectDTO {
  @Field({
    description: 'Nome do projeto',
  })
  readonly name: string;

  @Field({
    description: 'Descrição do projeto',
  })
  readonly description: string;

}
