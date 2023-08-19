'use client';
import { PropsWithChildren } from 'react'
import {
  HttpLink,
  ApolloLink,
  DocumentNode,
  OperationVariables,
} from '@apollo/client'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
  useSuspenseQuery,
} from '@apollo/experimental-nextjs-app-support/ssr'
import fetch from 'cross-fetch'

const client = () => {
  const httpLink = new HttpLink({
    uri: process.env.API_BASE_URL,
    fetchOptions: fetch,
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  })
}

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ApolloNextAppProvider makeClient={client}>
      {children}
    </ApolloNextAppProvider>
  )
}

export function query<T> (gqlQuery: DocumentNode, variables?: OperationVariables) {
  const result = useSuspenseQuery<T, OperationVariables>(gqlQuery, {
    variables,
  });

  return result;
}
