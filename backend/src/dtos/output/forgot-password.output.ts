import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ForgotPasswordOutput {
  @Field(() => String)
  message!: string;
}

@ObjectType()
export class ResetPasswordOutput {
  @Field(() => String)
  message!: string;
}
