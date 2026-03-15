import { prismaClient } from "../../prisma/prisma";
import { UpdateProfileInput } from "../dtos/input/profile.input";
import { UserModel } from "../models/user.model";

export class ProfileService {
  async updateProfileName(
    userId: string,
    data: UpdateProfileInput,
  ): Promise<UserModel> {
    const updatedUser = await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
      },
    });

    return updatedUser;
  }

  async getProfile(userId: string): Promise<UserModel> {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }
}
