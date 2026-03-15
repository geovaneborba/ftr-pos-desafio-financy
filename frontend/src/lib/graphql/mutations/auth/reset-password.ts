import { gql } from '@apollo/client';

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data) {
      message
    }
  }
`;

export type ResetPasswordMutationData = {
  resetPassword: {
    message: string;
  };
};
