import { prismaClient } from "../../prisma/prisma";
import {
  ForgotPasswordInput,
  ResetPasswordInput,
} from "../dtos/input/forgot-password.input";
import {
  ForgotPasswordOutput,
  ResetPasswordOutput,
} from "../dtos/output/forgot-password.output";
import { hashPassword } from "../utils/hash-password";
import { generateRandomToken } from "../utils/generate-token";
import { emailService } from "./email.service";

export class PasswordResetService {
  async forgotPassword(
    data: ForgotPasswordInput,
  ): Promise<ForgotPasswordOutput> {
    const user = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return {
        message: "Se o e-mail existir, você receberá um link de redefinição.",
      };
    }

    await prismaClient.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const resetToken = generateRandomToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // expira em 1 hora

    await prismaClient.passwordResetToken.create({
      data: {
        token: resetToken,
        userId: user.id,
        expiresAt,
      },
    });

    await emailService.sendPasswordResetEmail(user.email, resetToken);

    return {
      message: "Se o e-mail existir, você receberá um link de redefinição.",
    };
  }

  async resetPassword(data: ResetPasswordInput): Promise<ResetPasswordOutput> {
    const resetToken = await prismaClient.passwordResetToken.findUnique({
      where: {
        token: data.token,
      },
      include: {
        user: true,
      },
    });

    if (!resetToken) {
      throw new Error("Token inválido ou expirado");
    }

    if (resetToken.expiresAt < new Date()) {
      await prismaClient.passwordResetToken.delete({
        where: {
          id: resetToken.id,
        },
      });
      throw new Error("Token expirado");
    }

    const hashedPassword = await hashPassword(data.newPassword);

    await prismaClient.user.update({
      where: {
        id: resetToken.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prismaClient.passwordResetToken.delete({
      where: {
        id: resetToken.id,
      },
    });

    await prismaClient.refreshToken.deleteMany({
      where: {
        userId: resetToken.userId,
      },
    });

    return { message: "Senha redefinida com sucesso" };
  }
}
