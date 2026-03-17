import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';

import { App } from './App.tsx';
import { apolloClient } from './lib/graphql/apollo-client.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
