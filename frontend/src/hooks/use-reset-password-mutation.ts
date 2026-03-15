import { useMutation } from '@apollo/client/react';
import { RESET_PASSWORD_MUTATION } from '@/lib/graphql/mutations/auth/reset-password';

export function useResetPasswordMutation() {
  return useMutation(RESET_PASSWORD_MUTATION);
}
