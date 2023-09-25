/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "reflect-metadata";
import 'react-native-gesture-handler';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'inversify-react';

import { container } from './src/infrastructure/dependencyInjection';
import { AppNavigator } from "./src/presentation/navigation/AppNavigator";

function App(): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <Provider container={container} key={container.id} >
      <QueryClientProvider client={queryClient} >
        <AppNavigator/>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
