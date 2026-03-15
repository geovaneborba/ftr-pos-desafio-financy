import { User } from '@/schemas/user-schema';
import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      token
      refreshToken
      user {
        id
        name
        email
        createdAt
        updatedAt
      }
    }
  }
`;

export type RegisterMutationData = {
  register: {
    token: string;
    refreshToken: string;
    user: User;
  };
};
