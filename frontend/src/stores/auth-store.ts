import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../schemas/user-schema';
import { apolloClient } from '@/lib/graphql/apollo-client';
import {
  REGISTER_MUTATION,
  RegisterMutationData
} from '@/lib/graphql/mutations/auth/register';
import { LoginFormData, RegisterUserFormData } from '@/schemas/auth-schema';
import {
  LOGIN_MUTATION,
  LoginMutationData
} from '@/lib/graphql/mutations/auth/login';
import {
  REFRESH_TOKEN_MUTATION,
  RefreshTokenMutationData
} from '@/lib/graphql/mutations/auth/refresh-token';
import { LOGOUT_MUTATION } from '@/lib/graphql/mutations/auth/logout';

import {
  UPDATE_PROFILE_MUTATION,
  UpdateProfileMutationData
} from '@/lib/graphql/mutations/user/update-profile';
import { ProfileFormData } from '@/schemas/profile-schema';
import { toast } from 'sonner';

type AuthState = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  signUp: (data: RegisterUserFormData) => Promise<boolean>;
  signIn: (data: LoginFormData) => Promise<boolean>;
  refreshAccessToken: () => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (name: string) => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      signUp: async ({ name, email, password }: RegisterUserFormData) => {
        try {
          const { data } = await apolloClient.mutate<
            RegisterMutationData,
            { data: RegisterUserFormData }
          >({
            mutation: REGISTER_MUTATION,
            variables: {
              data: {
                name,
                email,
                password
              }
            }
          });

          if (data?.register) {
            const { token, user, refreshToken } = data.register;

            set({
              user,
              token,
              refreshToken,
              isAuthenticated: true
            });

            return true;
          }

          return false;
        } catch (error) {
          toast.error('Erro ao fazer o cadastro. Tente novamente.');
          throw error;
        }
      },
      signIn: async ({ email, password }: LoginFormData) => {
        try {
          const { data } = await apolloClient.mutate<
            LoginMutationData,
            { data: LoginFormData }
          >({
            mutation: LOGIN_MUTATION,
            variables: {
              data: {
                email: email,
                password: password
              }
            }
          });

          if (data?.login) {
            const { user, token, refreshToken } = data.login;

            set({
              user,
              token,
              refreshToken,
              isAuthenticated: true
            });

            return true;
          }
          return false;
        } catch (error) {
          toast.error('Erro ao fazer login. Verifique suas credenciais.');
          throw error;
        }
      },
      refreshAccessToken: async () => {
        try {
          const refreshToken = useAuthStore.getState().refreshToken;

          if (!refreshToken) {
            await useAuthStore.getState().logout();
            return false;
          }

          const query = `
            mutation RefreshToken($refreshToken: String!) {
              refreshToken(refreshToken: $refreshToken) {
                token
                refreshToken
                user { id name email }
              }
            }`;

          const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              query,
              variables: { refreshToken }
            })
          });

          const json = await response.json();

          if (json.errors || !json.data?.refreshToken) {
            await useAuthStore.getState().logout();
            return false;
          }

          const {
            token,
            refreshToken: newRefreshToken,
            user
          } = json.data.refreshToken;

          set({
            token,
            refreshToken: newRefreshToken,
            user,
            isAuthenticated: true
          });
          return true;
        } catch (error) {
          toast.error('Erro ao atualizar o token de acesso');
          console.error('Erro ao atualizar o token de acesso', error);
          await useAuthStore.getState().logout();
          return false;
        }
      },
      updateProfile: async (name: string) => {
        try {
          const { data } = await apolloClient.mutate<
            UpdateProfileMutationData,
            { data: ProfileFormData }
          >({
            mutation: UPDATE_PROFILE_MUTATION,
            variables: {
              data: {
                name
              }
            }
          });

          if (data?.updateProfileName) {
            const updatedUser = data.updateProfileName;

            set({
              user: updatedUser
            });

            return true;
          }

          return false;
        } catch (error) {
          toast.error('Erro ao atualizar perfil');
          console.error('Erro ao atualizar perfil', error);
          throw error;
        }
      },
      logout: async () => {
        const refreshToken = useAuthStore.getState().refreshToken;

        if (refreshToken) {
          try {
            await apolloClient.mutate({
              mutation: LOGOUT_MUTATION,
              variables: {
                refreshToken
              }
            });
          } catch (error) {
            toast.error('Erro ao fazer logout');
            console.error('Erro ao fazer logout', error);
          }
        }

        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false
        });

        await apolloClient.clearStore();
      }
    }),
    {
      name: '@financy-1.0.0-auth'
    }
  )
);
