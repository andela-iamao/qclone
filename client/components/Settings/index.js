import { Columns, Column } from 're-bulma';
import { compose, graphql } from 'react-apollo';
import Layout from '../Layout';
import GraphQL from '../../GraphQL';
import withData from '../../../apollo/withData';

const userList = [
  'id', 'firstname', 'lastname', 'profile_photo', 'profile_credential', 'description', 'employment { id, position, company, start, end }'
];

const QUERY_GET_USER = GraphQL.QUERY_GET_USER(userList);


class Settings extends React.Component {
  render() {

    if (!this.props.data.getUser) {
      return <div />;
    }
    return (
      <Layout isAuth>
        <Column>
          <Columns size="is9" style={{ margin: 'auto' }}>
            <h3>Sorry About this but the settings page is still under construction</h3>
          </Columns>
        </Column>
      </Layout>
    );
  }
}

export default withData(compose(
  graphql(QUERY_GET_USER, {options: ({ id }) => ({ variables: { id } })}),
)(Settings));
