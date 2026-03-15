import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

import { CategoryService } from "../services/category.service";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
  ListCategoriesInput,
} from "../dtos/input/category.input";
import { CategoryModel } from "../models/category.model";
import { UserModel } from "../models/user.model";
import { requireAuth } from "../middlewares/auth.middleware";
import { GqlUser } from "../graphql/decorators/user.decorator";

@Resolver(() => CategoryModel)
@UseMiddleware(requireAuth)
export class CategoryResolver {
  private categoryService: CategoryService = new CategoryService();

  @Mutation(() => CategoryModel)
  async createCategory(
    @GqlUser() user: UserModel,
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
  ) {
    return await this.categoryService.createCategory(user.id, data);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @GqlUser() user: UserModel,
    @Arg("categoryId", () => String) categoryId: string,
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
  ) {
    return this.categoryService.updateCategory(user.id, categoryId, data);
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg("categoryId", () => String) categoryId: string,
    @GqlUser() user: UserModel,
  ) {
    return this.categoryService.deleteCategory(user.id, categoryId);
  }

  @Query(() => [CategoryModel])
  async listCategories(
    @GqlUser() user: UserModel,
    @Arg("filters", () => ListCategoriesInput, { nullable: true })
    filters?: ListCategoriesInput,
  ) {
    return await this.categoryService.listCategories(user.id, filters);
  }

  @Query(() => CategoryModel)
  async getCategoryById(
    @Arg("categoryId", () => String) categoryId: string,
    @GqlUser() user: UserModel,
  ) {
    return await this.categoryService.getCategoryById(user.id, categoryId);
  }
}
