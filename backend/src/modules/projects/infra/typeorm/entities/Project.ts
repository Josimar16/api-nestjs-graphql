import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType({ description: 'Entidade projeto' })
@Entity({ name: 'project' })
export default class Project {
  @Field(() => ID, {
    description: 'Identificação do projeto',
  })
  @PrimaryGeneratedColumn('uuid')
  project_id: string;

  @Field({
    description: 'Nome do projeto',
  })
  @Column({ type: 'character varying', nullable: false })
  name: string;

  @Field({
    description: 'Descrição do projeto',
  })
  @Column({ type: 'character varying', nullable: false })
  description: string;

  @Field({
    description: 'Data da criação do projeto',
  })
  @CreateDateColumn({ type: 'time with time zone' })
  created_at: Date;

  @Field({
    description: 'Data da ultima atualização do projeto',
  })
  @UpdateDateColumn({ type: 'time with time zone' })
  updated_at: Date;
}
