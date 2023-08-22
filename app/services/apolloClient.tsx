'use client';
import { PropsWithChildren } from 'react'
import {
  HttpLink,
  ApolloLink,
  DocumentNode,
  OperationVariables,
  useMutation,
  MutationTuple,
  MutationOptions,
  UseSuspenseQueryResult,
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

export function query<T> (gqlQuery: DocumentNode, variables?: OperationVariables): UseSuspenseQueryResult<T> {
  const result = useSuspenseQuery<T, OperationVariables>(gqlQuery, {
    variables,
  });

  return result;
}

export function mutation<T, D>(gqlQuery: DocumentNode, options?: MutationOptions<T, D>): MutationTuple<T, D> {
  return useMutation<T, D>(gqlQuery, options);
}
