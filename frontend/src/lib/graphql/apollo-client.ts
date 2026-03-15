import {
  ApolloClient,
  InMemoryCache,
  CombinedGraphQLErrors,
  HttpLink,
  ApolloLink,
  Observable
} from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { SetContextLink } from '@apollo/client/link/context';
import { useAuthStore } from '@/stores/auth-store';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

function notifySubscribers(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

function clearSubscribers() {
  refreshSubscribers = [];
}

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (!CombinedGraphQLErrors.is(error)) {
    return;
  }

  const isUnauthenticated = error.errors.some(
    (e) =>
      e.extensions?.code === 'UNAUTHENTICATED' ||
      e.message.toLowerCase() ===
        'O usuário não está autenticado.'.toLocaleLowerCase()
  );

  if (!isUnauthenticated) {
    return;
  }

  const { refreshToken, refreshAccessToken } = useAuthStore.getState();

  if (!refreshToken) {
    return;
  }

  // Requisições que chegam enquanto já há um refresh em andamento
  // simplesmente entram na fila e esperam
  if (isRefreshing) {
    return new Observable((observer) => {
      addRefreshSubscriber((newToken) => {
        operation.setContext(({ headers = {} }) => ({
          headers: { ...headers, authorization: `Bearer ${newToken}` }
        }));
        forward(operation).subscribe(observer);
      });
    });
  }

  isRefreshing = true;

  return new Observable((observer) => {
    // Tenta renovar o token
    refreshAccessToken()
      .then((success) => {
        if (!success) {
          throw new Error('Falha ao renovar o token');
        }

        const newToken = useAuthStore.getState().token;

        if (!newToken) {
          throw new Error('Token não encontrado após renovação');
        }

        notifySubscribers(newToken);

        // O authLink vai injetar o novo token automaticamente no retry
        forward(operation).subscribe(observer);
      })
      .catch((err) => {
        clearSubscribers();
        observer.error(err);
      })
      .finally(() => {
        isRefreshing = false;
      });
  });
});

const authLink = new SetContextLink((prevContext) => {
  const token = useAuthStore.getState().token;
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
});
