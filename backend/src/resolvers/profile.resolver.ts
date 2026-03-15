import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UpdateProfileInput } from "../dtos/input/profile.input";
import { UserModel } from "../models/user.model";
import { ProfileService } from "../services/profile.service";
import { requireAuth } from "../middlewares/auth.middleware";
import { GqlUser } from "../graphql/decorators/user.decorator";

@Resolver()
@UseMiddleware(requireAuth)
export class ProfileResolver {
  private profileService: ProfileService = new ProfileService();

  @Query(() => UserModel)
  async getProfile(@GqlUser() user: UserModel): Promise<UserModel> {
    return this.profileService.getProfile(user.id);
  }

  @Mutation(() => UserModel)
  async updateProfileName(
    @GqlUser() user: UserModel,
    @Arg("data", () => UpdateProfileInput) data: UpdateProfileInput,
  ): Promise<UserModel> {
    return this.profileService.updateProfileName(user.id, data);
  }
}
