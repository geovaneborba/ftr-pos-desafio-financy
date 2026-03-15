import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { UserModel } from "./user.model";
import { CategoryModel } from "./category.model";

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  type!: string;

  @Field(() => String)
  description!: string;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => Number)
  amountInCents!: number;

  @Field(() => String)
  userId!: string;

  @Field(() => String)
  categoryId!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel;
}

@ObjectType()
export class ListTransactionsModel {
  @Field(() => [TransactionModel])
  transactions!: TransactionModel[];

  @Field(() => Number)
  totalCount!: number;

  @Field(() => Number)
  currentPage!: number;

  @Field(() => Number)
  totalPages!: number;

  @Field(() => Number)
  limit!: number;
}
