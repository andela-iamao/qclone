import { ApolloClient, createNetworkInterface } from 'react-apollo';
import fetch from 'isomorphic-fetch';

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

function create (headers, initialState) {
  return new ApolloClient({
    initialState,
    ssrMode: !process.browser,
    networkInterface: createNetworkInterface({
      uri: 'http://localhost:5000/graphql', // TODO: Change this to server's grapql
      opts: {
        credentials: 'same-origin'
      }
    })
  });
}

export default function initApollo (headers, initialState = {}) {
  if (!process.browser) {
    return create(headers, initialState);
  }

  if (!apolloClient) {
    apolloClient = create(headers, initialState);
  }

  return apolloClient;
}
