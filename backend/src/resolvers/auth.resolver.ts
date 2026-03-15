import { Arg, Mutation, Resolver } from "type-graphql";

import { AuthService } from "../services/auth.service";
import { RefreshTokenService } from "../services/refresh-token.service";
import { PasswordResetService } from "../services/password-reset.service";

import { LoginInput, RegisterInput } from "../dtos/input/auth.input";
import {
  ForgotPasswordInput,
  ResetPasswordInput,
} from "../dtos/input/forgot-password.input";
import {
  LoginOutput,
  RefreshTokenOutput,
  RegisterOutput,
} from "../dtos/output/auth.output";
import {
  ForgotPasswordOutput,
  ResetPasswordOutput,
} from "../dtos/output/forgot-password.output";

@Resolver()
export class AuthResolver {
  private authService: AuthService = new AuthService();
  private refreshTokenService: RefreshTokenService = new RefreshTokenService();
  private passwordResetService: PasswordResetService =
    new PasswordResetService();

  @Mutation(() => RegisterOutput)
  async register(
    @Arg("data", () => RegisterInput) data: RegisterInput,
  ): Promise<RegisterOutput> {
    return this.authService.register(data);
  }

  @Mutation(() => LoginOutput)
  async login(@Arg("data", () => LoginInput) data: LoginInput) {
    return this.authService.login(data);
  }

  @Mutation(() => RefreshTokenOutput)
  async refreshToken(@Arg("refreshToken", () => String) refreshToken: string) {
    return await this.refreshTokenService.refreshAccessToken(refreshToken);
  }

  @Mutation(() => Boolean)
  async logout(@Arg("refreshToken", () => String) refreshToken: string) {
    return await this.refreshTokenService.revokeRefreshToken(refreshToken);
  }

  @Mutation(() => ForgotPasswordOutput)
  async forgotPassword(
    @Arg("data", () => ForgotPasswordInput) data: ForgotPasswordInput,
  ): Promise<ForgotPasswordOutput> {
    return this.passwordResetService.forgotPassword(data);
  }

  @Mutation(() => ResetPasswordOutput)
  async resetPassword(
    @Arg("data", () => ResetPasswordInput) data: ResetPasswordInput,
  ): Promise<ResetPasswordOutput> {
    return this.passwordResetService.resetPassword(data);
  }
}
