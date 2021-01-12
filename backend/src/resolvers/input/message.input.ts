import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class MessageInput {
  @Field()
  readonly title: string;

  @Field()
  readonly content: string;

  @Field()
  readonly user_id: string;
}

@InputType()
export class DeleteMessageInput {
  @Field()
  readonly id: string;

  @Field()
  readonly user_id: string;
}
