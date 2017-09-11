import { gql, graphql } from 'react-apollo';
import withData from '../apollo';

const query = gql`
query {
  allEvent {
    name
    id
  }
}
`;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Ash'
    };
  }

  render() {
    return (
      <div>MyComponent {this.state.name}</div>
    );
  }
}

export default withData(graphql(query)(Index));
