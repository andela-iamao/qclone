import { Columns, Column } from 're-bulma';
import { compose, graphql } from 'react-apollo';
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
  'id', 'firstname', 'lastname', 'profile_photo', 'profile_credential', 'description', 'employment { id, position, company, start, end }'
];

const QUERY_GET_USER = GraphQL.QUERY_GET_USER(userList);

const QUERY_GET_USER_ANSWERS = GraphQL.QUERY_GET_USER_ANSWERS([
  'id', 'content', 'question { id, content }', 'upvotes', 'created_at', 'views'
]);

const MUTATION_UPLOAD_AVATAR = GraphQL.MUTATION_UPLOAD_AVATAR(userList);

const MUTATION_UPDATE_USER = GraphQL.MUTATION_UPDATE_USER(userList);

const MUTATION_ADD_CREDENTIALS = GraphQL.MUTATION_ADD_CREDENTIALS(userList);

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
      employment: {
        start: 2017,
        end: 2017,
        position: '',
        company: '',
        active: false
      }
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
  }

  componentWillMount() {
    if (this.props.data.getUser) {
      this.setState({
        profileCredential: this.props.data.getUser.profile_credential,
        description: this.props.data.getUser.description
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
        description: data.getUser.description
      });
    }
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

  toggleCredentialAddModal(cred) {
    this.setState({ credentialAddModal: cred ? cred : '' });
  }

  toggleCredentialTooltip() {
    this.setState({ credentialTooltip: !this.state.credentialTooltip });
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
          [state]: this.state[state]
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
      this.toggleCredentialAddModal(false);
    } catch(error) {
      console.error(error);
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
    const { getUserAnswers: answers } = this.props.answers;
    return (
      <Layout isAuth>
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
                    <Feeds />
                    <ActiveFeed
                      profile_photo={getUser.profile_photo}
                      answers={answers}
                      fullname={`${getUser.firstname} ${getUser.lastname}`}
                    />
                  </Columns>
                </Column>
              </Column>
              <Column size="is3">
                <Credentials
                  employment={getUser.employment}
                  toggleCredentialAddModal={this.toggleCredentialAddModal}
                />
                <Knowledge
                  toggleCredentialAddModal={this.toggleCredentialAddModal}
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
          <AddEducation credentialAddModal={credentialAddModal} toggleCredentialAddModal={this.toggleCredentialAddModal}/>
          <AddLocation credentialAddModal={credentialAddModal} toggleCredentialAddModal={this.toggleCredentialAddModal}/>
          <AddTopic credentialAddModal={credentialAddModal} toggleCredentialAddModal={this.toggleCredentialAddModal}/>
          <AddKnowledge credentialAddModal={credentialAddModal} toggleCredentialAddModal={this.toggleCredentialAddModal}/>
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
  graphql(QUERY_GET_USER, {options: ({ id }) => ({ variables: { id } })}),
  graphql(QUERY_GET_USER_ANSWERS, { name: 'answers' })
)(UserProfile));
