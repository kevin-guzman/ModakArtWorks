import { Provider } from "inversify-react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { FunctionComponent, ReactNode } from "react";
import { Container } from "inversify";

type props = {
  children: ReactNode
}

export const createProviderWrapper = (constainer: Container, queryClient: QueryClient): FunctionComponent<props> => {
  return ({ children }) => (
    <QueryClientProvider client={queryClient} >
      <Provider container={constainer} >
        {children}
      </Provider>
    </QueryClientProvider>
  )
}