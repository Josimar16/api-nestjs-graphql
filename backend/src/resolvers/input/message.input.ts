import { Field, InputType } from '@nestjs/graphql';

@InputType()
class MessageUserConnectInput {
  @Field()
  readonly id: string;
}

@InputType()
class MesssageUserInput {
  @Field({ nullable: true })
  readonly connect: MessageUserConnectInput;

  @Field({ nullable: true })
  readonly create: UserInput;
}

@InputType()
export default class UserInput {
  @Field()
  readonly user: MesssageUserInput;

  @Field()
  readonly title: string;

  @Field()
  readonly content: string;
}
