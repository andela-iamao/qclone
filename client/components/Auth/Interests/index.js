import { gql, graphql, compose } from 'react-apollo';
import Layout from '../../Layout';
import SelectInterests from '../../SelectInterest';
import withData from '../../../../apollo';

const QUERY_TOPICS = gql`
  query {
    allTopics {
      id
      title
      image
    }
  }
`;

const MUTATION_UPDATE_USER_INTERESTS = gql`
  mutation UpdateUserInterestInput($interests: [ID]) {
    updateUserInterest(data: {
      interests: $interests
    }) {
      id
      interests
    }
  }
`;

const MUTATION_UPDATE_REGISTRATION_PROGRESS = gql`
  mutation UpdateRegistrationProgressInput(
    $registeration_progress: ID
  ) {
    updateRegistrationProgress(data: {
      registeration_progress: $registeration_progress
    }) {
      id
      registeration_progress
    }
  }
`;

class Interests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: []
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCheck(interest) {
    let { selected } = this.state;
    if (selected.includes(interest)) {
      selected = selected.filter((item) => item !== interest);
    } else {
      selected.push(interest);
    }
    this.setState({ selected });
  }

  async handleSubmit() {
    const { selected: interests } = this.state;
    try {
      const result = await this.props.updateUserInterest({
        variables: {
          interests
        }
      });
      console.info(result);
      this.props.updateRegProgress({
        variables: {
          registeration_progress: 1
        }
      });
      this.props._next(2);
    } catch(error) {
      console.info(error.graphQLErrors[0]);
    }
  }

  render() {
    const { selected } = this.state;
    return (
      <Layout isProgress>
        {this.props.data.allTopics &&
          <SelectInterests
            handleCheck={this.handleCheck}
            handleSubmit={this.handleSubmit}
            topics={this.props.data.allTopics}
            selected={selected}
          />
        }
      </Layout>
    );
  }
}

export default withData(compose(
  graphql(QUERY_TOPICS),
  graphql(MUTATION_UPDATE_REGISTRATION_PROGRESS, { name: 'updateRegProgress' }),
  graphql(MUTATION_UPDATE_USER_INTERESTS, { name: 'updateUserInterest' })
)(Interests));
