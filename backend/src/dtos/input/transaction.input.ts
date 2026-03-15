import {
  Field,
  GraphQLISODateTime,
  InputType,
  registerEnumType,
} from "type-graphql";

import { TransactionType } from "@prisma/client";

registerEnumType(TransactionType, {
  name: "Type",
  description: "Tipo de transação: entrada (income) ou saída (outcome)",
});

@InputType()
export class CreateTransactionInput {
  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => String)
  description!: string;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => Number)
  amountInCents!: number;

  @Field(() => String)
  categoryId?: string;
}

@InputType()
export class UpdateTransactionInput {
  @Field(() => TransactionType)
  type?: TransactionType;

  @Field(() => String)
  description?: string;

  @Field(() => GraphQLISODateTime)
  date?: Date;

  @Field(() => Number)
  amountInCents?: number;

  @Field(() => String)
  categoryId?: string;
}

@InputType()
export class ListTransactionsInput {
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => String, { nullable: true })
  period?: string;

  @Field(() => Number, { nullable: true })
  page?: number;

  @Field(() => Number, { nullable: true })
  limit?: number;
}
