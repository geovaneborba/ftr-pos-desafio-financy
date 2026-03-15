import { useMutation } from '@apollo/client/react';
import { FORGOT_PASSWORD_MUTATION } from '@/lib/graphql/mutations/auth/forgot-password';

export function useForgotPasswordMutation() {
  return useMutation(FORGOT_PASSWORD_MUTATION);
}
