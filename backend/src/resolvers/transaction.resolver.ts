import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";

import {
  TransactionModel,
  ListTransactionsModel,
} from "../models/transaction.model";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
  ListTransactionsInput,
} from "../dtos/input/transaction.input";
import { TransactionService } from "../services/transaction.service";
import { UserModel } from "../models/user.model";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { requireAuth } from "../middlewares/auth.middleware";

@Resolver(() => TransactionModel)
@UseMiddleware(requireAuth)
export class TransactionResolver {
  private transactionService: TransactionService = new TransactionService();

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: UserModel,
  ) {
    return await this.transactionService.createTransaction(user.id, data);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @GqlUser() user: UserModel,
    @Arg("transactionId", () => String) transactionId: string,
    @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
  ) {
    return this.transactionService.updateTransaction(
      transactionId,
      user.id,
      data,
    );
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @GqlUser() user: UserModel,
    @Arg("transactionId", () => String) transactionId: string,
  ) {
    return this.transactionService.deleteTransaction(transactionId, user.id);
  }

  @Query(() => ListTransactionsModel)
  async listTransactions(
    @GqlUser() user: UserModel,
    @Arg("filters", () => ListTransactionsInput, { nullable: true })
    filters?: ListTransactionsInput,
  ): Promise<ListTransactionsModel> {
    return await this.transactionService.listTransactions(user.id, filters);
  }

  @Query(() => Number)
  async getTotalBalance(@GqlUser() user: UserModel) {
    return this.transactionService.getTotalBalance(user.id);
  }

  @Query(() => Number)
  async getTotalIncome(@GqlUser() user: UserModel) {
    return this.transactionService.getTotalIncome(user.id);
  }

  @Query(() => Number)
  async getTotalExpense(@GqlUser() user: UserModel) {
    return this.transactionService.getTotalExpense(user.id);
  }

  @Query(() => TransactionModel)
  async getTransactionById(
    @GqlUser() user: UserModel,
    @Arg("transactionId", () => String) transactionId: string,
  ) {
    return this.transactionService.getTransactionById(transactionId, user.id);
  }
}
