import { prismaClient } from "../../prisma/prisma";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
  ListCategoriesInput,
} from "../dtos/input/category.input";

export class CategoryService {
  async createCategory(userId: string, data: CreateCategoryInput) {
    const { name, description, color, icon } = data;

    const categoryName = name.trim().toLocaleLowerCase();

    if (!categoryName || categoryName.length === 0) {
      throw new Error("Nome da categoria é obrigatório");
    }

    const existingCategory = await prismaClient.category.findFirst({
      where: {
        name: categoryName,
        userId,
      },
    });

    if (existingCategory) {
      throw new Error("Já existe uma categoria com este nome");
    }

    const newCategory = {
      name: categoryName,
      description,
      color,
      icon,
      userId,
    };

    return await prismaClient.category.create({
      data: newCategory,
    });
  }

  async updateCategory(
    userId: string,
    categoryId: string,
    data: UpdateCategoryInput,
  ) {
    const { name, description, color, icon } = data;

    const existingCategory = await prismaClient.category.findUnique({
      where: { id: categoryId, userId },
    });

    if (!existingCategory) {
      throw new Error("Categoria nao encontrada");
    }

    const updateCategory = {
      name,
      description,
      color,
      icon,
    };

    return await prismaClient.category.update({
      where: { id: categoryId, userId },
      data: updateCategory,
    });
  }

  async listCategories(userId: string, filters?: ListCategoriesInput) {
    const { limit } = filters || {};

    const categoriesWithTransactions = await prismaClient.category.findMany({
      where: { userId },

      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
        transactions: {
          select: {
            amountInCents: true,
          },
        },
      },
      take: limit,
    });

    if (categoriesWithTransactions.length === 0) {
      throw new Error("Nenhuma categoria encontrada");
    }

    const categories = categoriesWithTransactions.map((category) => {
      const transactionCount = category._count.transactions;
      const totalAmountInCents = category.transactions.reduce(
        (total, transaction) => total + transaction.amountInCents,
        0,
      );

      return {
        ...category,
        transactionCount,
        totalAmountInCents,
      };
    });

    const categoriesOrderByTransactionCount = categories.sort((a, b) => {
      return b.totalAmountInCents - a.totalAmountInCents;
    });

    return categoriesOrderByTransactionCount;
  }

  async getCategoryById(userId: string, categoryId: string) {
    const category = await prismaClient.category.findUnique({
      where: { id: categoryId, userId },
    });

    if (!category) {
      throw new Error("Categoria nao encontrada");
    }

    return category;
  }

  async deleteCategory(userId: string, categoryId: string) {
    const existingCategory = await prismaClient.category.findUnique({
      where: { id: categoryId, userId },
    });

    if (!existingCategory) {
      throw new Error("Categoria nao encontrada");
    }

    await prismaClient.category.delete({
      where: { id: categoryId, userId },
    });

    return true;
  }
}
