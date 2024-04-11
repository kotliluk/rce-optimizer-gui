import { ApolloClient, InMemoryCache } from '@apollo/client'
import { HttpLink } from '@apollo/client'


const GRAPHQL_HTTP = 'http://localhost:5000/graphql'

const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP,
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({ addTypename: false }),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})
