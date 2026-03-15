import { gql } from '@apollo/client';
import { User } from '@/schemas/user-schema';

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfileName($data: UpdateProfileInput!) {
    updateProfileName(data: $data) {
      name
    }
  }
`;
export type UpdateProfileMutationData = {
  updateProfileName?: User;
};
