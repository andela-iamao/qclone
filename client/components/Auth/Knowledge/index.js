import { graphql, compose } from 'react-apollo';
import Layout from '../../Layout';
import SelectKnowledge from '../../SelectKnowledge';
import withData from '../../../../apollo';
import GraphQL from '../../../GraphQL';

// const QUERY_TOPICS = gql`
//   query {
//     allTopics {
//       id
//       title
//       image
//     }
//   }
// `;

const QUERY_ALL_TOPICS = GraphQL.QUERY_ALL_TOPICS(['id', 'title', 'image']);
const MUTATION_UPDATE_USER_KNOWLEDGE = GraphQL.MUTATION_UPDATE_USER_KNOWLEDGE();
const MUTATION_UPDATE_REGISTRATION_PROGRESS = GraphQL.MUTATION_UPDATE_REGISTRATION_PROGRESS(['id', 'registeration_progress']);
const MUTATION_CREATE_TOPIC = GraphQL.MUTATION_CREATE_TOPIC(['id', 'title', 'image', 'followers']);

class Knowledge extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchQuery: '',
      searchResult: [],
      searchState: {
        blur: true
      },
      selected: []
    };

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleSearchInput(event) {
    const { value } = event.target;
    this.setState({ searchQuery: value });
    if(!value.length) {
      return this.setState({ searchResult: [] });
    }
    return this._search(value);
  }

  _search(query) {
    let { allTopics } = this.props.topics;
    let { selected } = this.state;
    selected = this._toObj(selected);
    const result = allTopics.filter((topic) => {
      if(topic.title.toLowerCase().match(query.toLowerCase()) &&
        !selected[topic.id]
      ) {
        return topic;
      }
    });
    this.setState({ searchResult: result });
  }

  _toObj(arr) {
    return arr.reduce((a, b) => {
      a[b.id] = b;
      return a;
    }, {});
  }

  handleSelect(topic) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.selected = [...newState.selected, topic];
      newState.searchQuery = '';
      return newState;
    });
  }

  onRemove(id) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.selected = [...newState.selected].filter((topic) => topic.id !== id);
      return newState;
    });
  }

  handleBlur() {
    this.setState({ searchState: { blur: true } });
  }

  async handleSubmit() {
    const { selected: topic_knowledge } = this.state;
    try {
      const result = await this.props.updateUserKnowledge({
        variables: {
          topic_knowledge: Object.keys(this._toObj(topic_knowledge))
        }
      });
      console.info(result);
      this.props.updateRegProgress({
        variables: {
          registeration_progress: 2
        }
      });
      this.props._next(3);
    } catch(error) {
      console.info(error.graphQLErrors[0]);
    }
  }

  async handleCreate() {
    this.props.topics.startPolling(500);
    const { searchQuery: title } = this.state;
    try {
      const result = await this.props.createTopic({
        variables: {
          title
        }
      });
      this.handleSelect(result.data.createTopic);
    } catch(error) {
      console.info(error.graphQLErrors[0]);
    }
  }

  render() {
    const { searchQuery, searchResult, selected } = this.state;
    const { topics } = this.props;
    return (
      <Layout isProgress>
        <SelectKnowledge
          handleSearchInput={this.handleSearchInput}
          searchQuery={searchQuery}
          topics={topics}
          searchResult={searchResult}
          selected={selected}
          handleSelect={this.handleSelect}
          onRemove={this.onRemove}
          handleSubmit={this.handleSubmit}
          handleCreate={this.handleCreate}
        />
      </Layout>
    );
  }
}

export default withData(compose(
  graphql(QUERY_ALL_TOPICS, { name: 'topics' }),
  graphql(MUTATION_UPDATE_REGISTRATION_PROGRESS, { name: 'updateRegProgress' }),
  graphql(MUTATION_CREATE_TOPIC, { name: 'createTopic' }),
  graphql(MUTATION_UPDATE_USER_KNOWLEDGE, { name: 'updateUserKnowledge' })
)(Knowledge));
