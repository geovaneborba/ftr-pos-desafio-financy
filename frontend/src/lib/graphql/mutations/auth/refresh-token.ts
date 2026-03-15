import { User } from '@/schemas/user-schema';
import { gql } from '@apollo/client';

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
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

export type RefreshTokenMutationData = {
  refreshToken: {
    token: string;
    refreshToken: string;
    user: User;
  };
};
