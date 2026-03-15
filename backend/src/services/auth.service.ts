import { prismaClient } from "../../prisma/prisma";
import { LoginInput, RegisterInput } from "../dtos/input/auth.input";
import { UserModel } from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/hash-password";
import { signJwt } from "../utils/jwt";
import { RefreshTokenService } from "./refresh-token.service";

export class AuthService {
  private refreshTokenService: RefreshTokenService = new RefreshTokenService();

  async generateTokens(user: UserModel) {
    const accessTokenExpiresIn = "15m";

    const accessToken = signJwt(
      {
        id: user.id,
        email: user.email,
      },
      accessTokenExpiresIn,
    );
    const refreshToken = await this.refreshTokenService.createRefreshToken(
      user.id,
      user.email,
    );

    return {
      token: accessToken,
      refreshToken,
      user,
    };
  }

  async register(data: RegisterInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error("E-mail já cadastrado!");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return await this.generateTokens(user);
  }

  async login(data: LoginInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!existingUser) {
      throw new Error("Credenciais inválidas");
    }

    const isPasswordValid = await comparePassword(
      data.password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas");
    }

    return await this.generateTokens(existingUser);
  }
}
