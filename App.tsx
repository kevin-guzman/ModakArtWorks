/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "reflect-metadata";
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'inversify-react';

import { ArtWorks } from './src/presentation/views/ArtWorks/ArtWorks';
import { container } from './src/infrastructure/dependencyInjection';

function App(): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <Provider container={container} key={container.id} >
      <QueryClientProvider client={queryClient} >
        <ArtWorks />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
