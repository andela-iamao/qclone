import { Columns, Column } from 're-bulma';
import { compose, graphql } from 'react-apollo';
import _ from 'lodash';
import Layout from '../Layout';
import ActiveFeed from './ActiveFeed';
import Credentials from './Credentials';
import Feeds from './Feeds';
import Knowledge from './Knowledge';
import UserInfo from './UserInfo';
import {
  AddEmployment, AddEducation, AddKnowledge, AddTopic, AddLocation, EditCredentials, AddProfileCredentials
} from './Modals';
import style from './style';
import GraphQL from '../../GraphQL';
import withData from '../../../apollo/withData';

const userList = [
  'id',
  'firstname',
  'lastname',
  'profile_photo',
  'profile_credential',
  'description',
  'employment { id, position, company, start, end }',
  'education { id, school, concentration, secondary_concentration, degree_type, graduation_year }',
  'location { id, start, end, location, active }',
  'topic_knowledge { id, title, image }',
  'interests { id, title, image }',
  'questions { id, author, content, followers }',
  'answers { id, content, question { id, content }, upvotes, created_at, views }',
  'followers { id, firstname, lastname }',
  'following { id, firstname, lastname }'
];

const QUERY_GET_USER = GraphQL.QUERY_GET_USER(userList);

const QUERY_GET_USER_ANSWERS = GraphQL.QUERY_GET_USER_ANSWERS([
  'id', 'content', 'question { id, content }', 'upvotes', 'created_at', 'views'
]);

const QUERY_ALL_TOPICS = GraphQL.QUERY_ALL_TOPICS(['id', 'title', 'image']);

const MUTATION_UPLOAD_AVATAR = GraphQL.MUTATION_UPLOAD_AVATAR(userList);

const MUTATION_UPDATE_USER = GraphQL.MUTATION_UPDATE_USER(userList);

const MUTATION_ADD_CREDENTIALS = GraphQL.MUTATION_ADD_CREDENTIALS(userList);

const MUTATION_ADD_DEFAULT_CREDENTIALS = GraphQL.MUTATION_ADD_DEFAULT_CREDENTIALS(userList);

const MUTATION_UPDATE_USER_KNOWLEDGE = GraphQL.MUTATION_UPDATE_USER_KNOWLEDGE(userList);

class UserProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      uploadModal: false,
      deleteImageModal: false,
      credentialModal: false,
      editingDescription: false,
      employmentModal: false,
      credentialAddModal: '',
      knowledge: [],
      credentialTooltip: false,
      profileCredential: '',
      description: '',
      employment: props.employment,
      education: props.education,
      location: props.location,
      comment: '',
      searchQuery: '',
      searchResult: [],
      selected: [],
      activeFeed: 'answers'
    };
    this.toggleUpload = this.toggleUpload.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.editDescription = this.editDescription.bind(this);
    this.toggleCredentials = this.toggleCredentials.bind(this);
    this.toggleImageDelete = this.toggleImageDelete.bind(this);
    this.toggleCredentialAddModal = this.toggleCredentialAddModal.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.toggleCredentialTooltip = this.toggleCredentialTooltip.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleCredentialInputChange = this.handleCredentialInputChange.bind(this);
    this.updateCredential = this.updateCredential.bind(this);
    this.searchTopic = this.searchTopic.bind(this);
    this.handleSelectKnowledge = this.handleSelectKnowledge.bind(this);
    this.handleChangeFeed = this.handleChangeFeed.bind(this);
  }

  static defaultProps = {
    education: {
      id: null,
      graduation_year: 2023,
      school: '',
      concentration: '',
      secondary_concentration: '',
      degree_type: ''
    },
    location: {
      id: null,
      end: 2017,
      start: 2017,
      location: '',
      active: false
    },
    employment: {
      id: null,
      start: 2017,
      end: 2017,
      position: '',
      company: '',
      active: false
    }
  }

  componentWillMount() {
    if (this.props.data.getUser) {
      this.setState({
        profileCredential: this.props.data.getUser.profile_credential,
        description: this.props.data.getUser.description,
        selected: this.props.data.getUser.topic_knowledge
      });
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data.getUser !== this.props.data.getUser) {
      this.setState({
        profileCredential: data.getUser.profile_credential,
        description: data.getUser.description,
        selected: data.getUser.topic_knowledge
      });
    }
  }

  _toObj(arr) {
    return arr.reduce((a, b) => {
      a[b.id] = b;
      return a;
    }, {});
  }

  toggleUpload() {
    this.setState({ uploadModal: !this.state.uploadModal });
  }

  toggleImageDelete() {
    this.setState({ deleteImageModal: !this.state.deleteImageModal });
  }

  toggleCredentials() {
    this.setState({ credentialModal: !this.state.credentialModal });
  }

  editDescription() {
    this.setState({ editingDescription: !this.state.editingDescription });
  }

  toggleCredentialAddModal(cred, state = null) {
    this.setState((prevState) => {
      const newState = {...prevState};
      newState.credentialAddModal = cred ? cred : '';
      if (state) {
        newState[cred] = state;
      }
      return newState;
    });
  }

  toggleCredentialTooltip() {
    this.setState({ credentialTooltip: !this.state.credentialTooltip });
  }

  handleSelect(topic) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.selected = [...newState.selected, topic.title];
      newState.searchQuery = '';
      return newState;
    });
  }

  onDrop(file) {
    this.setState({ image: file[0] });
    this.handleUpload(file[0]);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleEditorChange(html) {
    this.setState({ description: html });
  }

  handleCredentialInputChange(credential, { target }) {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState[credential][target.name] = target.value;
      return newState;
    });
  }

  handleChangeFeed(feed) {
    this.setState({ activeFeed: feed });
  }

  searchTopic(event) {
    if (event.target.value === '') {
      return this.setState({ searchResult: [], searchQuery: event.target.value });
    }
    let { allTopics } = this.props.topics;
    let { selected } = this.state;
    selected = this._toObj(selected);
    const result = allTopics.filter((topic) => {
      if(topic.title.toLowerCase().match(event.target.value.toLowerCase()) &&
        !selected[topic.id]
      ) {
        return topic;
      }
    });
    this.setState({ searchQuery: event.target.value, searchResult: result });
  }

  async handleUpload(file, remove=false) {
    const variables = file ? { avatar: file, remove } : { remove };
    try {
      await this.props.uploadAvatar({
        variables,
        update: (store, { getUser }) => {
          const data = store.readQuery({ query: QUERY_GET_USER, variables: { id: this.props.id } });
          data.getUser = getUser;
          store.writeQuery({ query: QUERY_GET_USER, variables: { id: this.props.id }, data });
        }
      });
      if (remove) {
        return this.toggleImageDelete();
      }
      return this.toggleUpload();
    } catch (err) {
      console.error(err);
    }
  }

  async updateUser(state) {
    try {
      await this.props.updateUser({
        variables: {
          [state]: this.state[state],
          credential: state
        },
        update: (store, d) => {
          const data = store.readQuery({ query: QUERY_GET_USER, variables: { id: this.props.id } });
          data.getUser = d.updateUser;
          store.writeQuery({ query: QUERY_GET_USER, variables: { id: this.props.id }, data });
        }
      });
      this.toggleCredentialAddModal(false);
      if (state === 'description') {
        this.editDescription();
      }
    } catch(error) {
      console.error(error);
    }
  }

  async updateCredential(credential) {
    const { education, employment, location } = this.props;
    try {
      await this.props.addCredential({
        variables: {
          [credential]: this.state[credential],
          credential
        },
        update: (store, d) => {
          const data = store.readQuery({ query: QUERY_GET_USER, variables: { id: this.props.id } });
          data.getUser = d.addCredentials;
          store.writeQuery({ query: QUERY_GET_USER, variables: { id: this.props.id }, data });
        }
      });
      this.setState({ education, employment, location });
      this.toggleCredentialAddModal(false);
    } catch(error) {
      console.error(error);
    }
  }

  async handleSelectKnowledge(topic, remove=false) {
    try {
      await this.props.updateUserKnowledge({
        variables: {
          topic_knowledge: [topic.id],
          remove
        },
        update: (store, d) => {
          const data = store.readQuery({ query: QUERY_GET_USER, variables: { id: this.props.id } });
          data.getUser = d.updateUserKnowledge;
          store.writeQuery({ query: QUERY_GET_USER, variables: { id: this.props.id }, data });
        }
      });
      if (!remove) {
        return this.setState({ selected: [...this.state.selected, topic], searchResult: [] });
      }
      this.setState({ selected: this.state.selected.filter((selected) => selected.id !== topic.id), searchResult: [] });
    } catch(error) {
      console.info(error.graphQLErrors[0]);
    }
  }

  render() {
    const {
      uploadModal,
      deleteImageModal,
      credentialTooltip,
      credentialModal,
      editingDescription,
      credentialAddModal,
      profileCredential,
      description
    } = this.state;

    if (!this.props.data.getUser || !this.props.answers.getUserAnswers) {
      return <div />;
    }
    const { getUser } = this.props.data;
    return (
      <Layout isAuth user={getUser}>
        <div className="profile-container">
          <Column size="is9" style={style.containerCol}>
            <Columns>
              <Column size="is9">
                <UserInfo
                  toggleUpload={this.toggleUpload}
                  uploadModal={uploadModal}
                  deleteImageModal={deleteImageModal}
                  toggleImageDelete={this.toggleImageDelete}
                  toggleCredentials={this.toggleCredentials}
                  credentialModal={credentialModal}
                  editingDescription={editingDescription}
                  editDescription={this.editDescription}
                  credentialAddModal={credentialAddModal}
                  onDrop={this.onDrop}
                  toggleCredentialAddModal={this.toggleCredentialAddModal}
                  handleUpload={this.handleUpload}
                  {...this.props.data.getUser}
                  description={description}
                  handleChange={this.handleEditorChange}
                  handleUpdate={this.updateUser}
                />
                <Column>
                  <Columns>
                    <Feeds
                      topics={_.union(getUser.topic_knowledge, getUser.interests)}
                      followers={getUser.followers.length}
                      following={getUser.following.length}
                      questions={getUser.questions.length}
                      answers={getUser.answers.length}
                      changeFeed={this.handleChangeFeed}
                      activeFeed={this.state.activeFeed}
                    />
                    <ActiveFeed
                      user={{...getUser}}
                      profile_photo={getUser.profile_photo}
                      profile_credential={getUser.profile_credential}
                      answers={getUser.answers}
                      questions={getUser.questions}
                      fullname={`${getUser.firstname} ${getUser.lastname}`}
                      activeFeed={this.state.activeFeed}
                      followers={getUser.followers}
                      following={getUser.following}
                      edits={[]}
                      topics={_.union(getUser.topic_knowledge, getUser.interests)}
                    />
                  </Columns>
                </Column>
              </Column>
              <Column size="is3">
                <Credentials
                  user={{...getUser}}
                  employment={getUser.employment}
                  education={getUser.education}
                  location={getUser.location}
                  toggleCredentialAddModal={this.toggleCredentialAddModal}
                />
                <Knowledge
                  toggleCredentialAddModal={this.toggleCredentialAddModal}
                  knowledge={this.state.selected}
                  user={{ ...getUser }}
                />
              </Column>
            </Columns>
          </Column>
          <AddEmployment
            credentialAddModal={credentialAddModal}
            toggleCredentialAddModal={this.toggleCredentialAddModal}
            handleChange={this.handleCredentialInputChange}
            employment={this.state.employment}
            handleSubmit={this.updateCredential}
          />
          <AddEducation
            credentialAddModal={credentialAddModal}
            toggleCredentialAddModal={this.toggleCredentialAddModal}
            handleChange={this.handleCredentialInputChange}
            education={this.state.education}
            handleSubmit={this.updateCredential}
          />
          <AddLocation
            credentialAddModal={credentialAddModal}
            toggleCredentialAddModal={this.toggleCredentialAddModal}
            handleChange={this.handleCredentialInputChange}
            location={this.state.location}
            handleSubmit={this.updateCredential}
          />
          <AddTopic credentialAddModal={credentialAddModal} toggleCredentialAddModal={this.toggleCredentialAddModal}/>
          <AddKnowledge
            credentialAddModal={credentialAddModal}
            toggleCredentialAddModal={this.toggleCredentialAddModal}
            searchResult={this.state.searchResult}
            handleSearch={this.searchTopic}
            query={this.state.searchQuery}
            selectKnowledge={this.handleSelectKnowledge}
            selected={this.state.selected}
          />
          <AddProfileCredentials
            handleInputChange={this.handleInputChange}
            credentialAddModal={credentialAddModal}
            toggleCredentialAddModal={this.toggleCredentialAddModal}
            handleUpdate={this.updateUser}
            profileCredential={profileCredential}
          />
          <EditCredentials
            credentialAddModal={credentialAddModal}
            toggleCredentialAddModal={this.toggleCredentialAddModal}
            toggleCredentialTooltip={this.toggleCredentialTooltip}
            credentialTooltip={credentialTooltip}
            employment={getUser.employment}
            education={getUser.education}
            location={getUser.location}
          />
        </div>
      </Layout>
    );
  }
}

export default withData(compose(
  graphql(MUTATION_UPLOAD_AVATAR, { name: 'uploadAvatar'}),
  graphql(MUTATION_UPDATE_USER, { name: 'updateUser'}),
  graphql(MUTATION_ADD_CREDENTIALS, { name: 'addCredential'}),
  graphql(MUTATION_ADD_DEFAULT_CREDENTIALS, { name: 'addDefaultCredential' }),
  graphql(MUTATION_UPDATE_USER_KNOWLEDGE, { name: 'updateUserKnowledge' }),
  graphql(QUERY_GET_USER, {options: ({ id }) => ({ variables: { id } })}),
  graphql(QUERY_GET_USER_ANSWERS, { name: 'answers' }),
  graphql(QUERY_ALL_TOPICS, { name: 'topics' })
)(UserProfile));
