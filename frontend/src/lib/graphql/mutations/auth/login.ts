import { User } from '@/schemas/user-schema';
import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
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

export type LoginMutationData = {
  login: {
    token: string;
    refreshToken: string;
    user: User;
  };
};
