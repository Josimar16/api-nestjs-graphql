import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Message from './Message';

@ObjectType()
@Entity('users')
export default class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Field(() => Message)
  @OneToMany(() => Message, message => message.user_id)
  @JoinColumn({ name: 'user_id' })
  messages: Message[];
}