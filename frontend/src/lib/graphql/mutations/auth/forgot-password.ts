import { gql } from '@apollo/client';

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($data: ForgotPasswordInput!) {
    forgotPassword(data: $data) {
      message
    }
  }
`;

export type ForgotPasswordMutationData = {
  forgotPassword: {
    message: string;
  };
};
