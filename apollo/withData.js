import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import initApollo from './initApollo';

export default (ComposedComponent) => {
  return class WithData extends React.Component {
    static displayName = `WithData(${ComposedComponent.displayName})`;
    static propTypes = {
      serverState: PropTypes.object.isRequired
    }

    static async getInitialProps (ctx) {
      const headers = ctx.req ? ctx.req.headers : {};
      let serverState = {};

      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      if (!process.browser) {
        const apollo = initApollo(headers);
        const url = { query: ctx.query, pathname: ctx.pathname };

        const app = (
          <ApolloProvider client={apollo}>
            <ComposedComponent url={url} {...composedInitialProps} />
          </ApolloProvider>
        );
        await getDataFromTree(app);

        const state = apollo.getInitialState();

        serverState = {
          apollo: {
            data: state.data
          }
        };
      }

      return {
        serverState,
        headers,
        ...composedInitialProps
      };
    }

    constructor (props) {
      super(props);
      this.apollo = initApollo(this.props.headers, this.props.serverState);
    }

    render () {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
};
