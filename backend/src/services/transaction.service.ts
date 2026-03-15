import { prismaClient } from "../../prisma/prisma";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
  ListTransactionsInput,
} from "../dtos/input/transaction.input";
import { ListTransactionsModel } from "../models/transaction.model";

export class TransactionService {
  async createTransaction(userId: string, data: CreateTransactionInput) {
    const { type, description, date, amountInCents, categoryId } = data;

    const existingUser = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error("Usuário não encontrado");
    }

    const existingCategory = await prismaClient.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      throw new Error("Categoria nao encontrada");
    }

    const newTransaction = {
      type,
      description,
      date,
      amountInCents,
      userId,
      categoryId,
    };

    return await prismaClient.transaction.create({
      data: newTransaction,
    });
  }

  async listTransactions(
    userId: string,
    filters?: ListTransactionsInput,
  ): Promise<ListTransactionsModel> {
    const {
      description,
      type,
      categoryId,
      period,
      page = 1,
      limit = 10,
    } = filters || {};

    const skip = (page - 1) * limit;

    const where: any = {
      userId,
      description: {
        contains: description,
      },
      type: type,
      categoryId,
    };

    if (period && period !== "all") {
      const [month, year] = period.split("/");
      const startDate = new Date(`${year}-${month.padStart(2, "0")}-01`);
      const nextMonth = new Date(parseInt(year), parseInt(month), 1); // Primeiro dia do próximo mês

      where.date = {
        gte: startDate,
        lt: nextMonth,
      };
    }

    const [transactions, totalCount] = await Promise.all([
      prismaClient.transaction.findMany({
        where,
        include: {
          category: true,
        },
        orderBy: {
          date: "desc",
        },
        skip,
        take: limit,
      }),
      prismaClient.transaction.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      transactions,
      totalCount,
      currentPage: page,
      totalPages,
      limit,
    };
  }

  async updateTransaction(
    transactionId: string,
    userId: string,
    data: UpdateTransactionInput,
  ) {
    if (data.categoryId) {
      const existingCategory = await prismaClient.category.findUnique({
        where: { id: data.categoryId },
      });

      if (!existingCategory) {
        throw new Error("Categoria não encontrada");
      }
    }

    try {
      return await prismaClient.transaction.update({
        where: { id: transactionId, userId },
        data,
      });
    } catch (error) {
      throw new Error("Transação não encontrada");
    }
  }

  async getTransactionById(transactionId: string, userId: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: { id: transactionId, userId },
      include: {
        category: true,
      },
    });

    if (!transaction) {
      throw new Error("Transação nao encontrada");
    }

    return transaction;
  }

  async getTotalBalance(userId: string) {
    const transactions = await prismaClient.transaction.findMany({
      where: { userId },
    });

    const totalBalance = transactions.reduce((acc, transaction) => {
      return transaction.type === "income"
        ? acc + transaction.amountInCents
        : acc - transaction.amountInCents;
    }, 0);

    return totalBalance;
  }

  async getTotalIncome(userId: string) {
    const transactions = await prismaClient.transaction.findMany({
      where: { userId, type: "income" },
    });

    const totalIncome = transactions.reduce((acc, transaction) => {
      return acc + transaction.amountInCents;
    }, 0);

    return totalIncome;
  }

  async getTotalExpense(userId: string) {
    const transactions = await prismaClient.transaction.findMany({
      where: { userId, type: "outcome" },
    });

    const totalExpense = transactions.reduce((acc, transaction) => {
      return acc + transaction.amountInCents;
    }, 0);

    return totalExpense;
  }

  async deleteTransaction(transactionId: string, userId: string) {
    const existingTransaction = await prismaClient.transaction.findUnique({
      where: { id: transactionId, userId },
    });

    if (!existingTransaction) {
      throw new Error("Transação nao encontrada");
    }

    await prismaClient.transaction.delete({
      where: { id: transactionId, userId },
    });

    return true;
  }
}
