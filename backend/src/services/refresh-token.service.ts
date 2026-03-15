import { prismaClient } from "../../prisma/prisma";
import { signJwt } from "../utils/jwt";

export class RefreshTokenService {
  async createRefreshToken(userId: string, email: string) {
    await prismaClient.refreshToken.deleteMany({
      where: { userId },
    });

    const refreshToken = signJwt({ id: userId, email }, "7d");
    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + 7);

    await prismaClient.refreshToken.create({
      data: {
        token: refreshToken,
        userId,
        expiresAt,
      },
    });

    return refreshToken;
  }

  async refreshAccessToken(refreshToken: string) {
    const storedToken = await prismaClient.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!storedToken) {
      throw new Error("Refresh token não encontrado");
    }

    if (storedToken.expiresAt < new Date()) {
      throw new Error("Refresh token expirado");
    }

    // Revogar token antigo
    await prismaClient.refreshToken.delete({ where: { id: storedToken.id } });

    const newAccessToken = signJwt(
      { id: storedToken.userId, email: storedToken.user.email },
      "15m",
    );

    const newRefreshToken = await this.createRefreshToken(
      storedToken.userId,
      storedToken.user.email,
    );

    return {
      token: newAccessToken,
      refreshToken: newRefreshToken,
      user: storedToken.user,
    };
  }

  async revokeRefreshToken(token: string) {
    const refreshTokenExists = await prismaClient.refreshToken.findUnique({
      where: { token },
    });

    if (refreshTokenExists) {
      await prismaClient.refreshToken.delete({
        where: { token },
      });

      return true;
    }

    return false;
  }
}
