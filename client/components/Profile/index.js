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

const userList = ['id', 'firstname', 'lastname', 'profile_photo', 'profile_credential'];

const QUERY_GET_USER = GraphQL.QUERY_GET_USER(userList);

const MUTATION_UPLOAD_AVATAR = GraphQL.MUTATION_UPLOAD_AVATAR(userList);

const MUTATION_UPDATE_USER = GraphQL.MUTATION_UPDATE_USER(userList);

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
      profileCredential: ''
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
  }

  componentWillMount() {
    if (this.props.data.getUser) {
      this.setState({ profileCredential: this.props.data.getUser.profile_credential });
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data.getUser !== this.props.data.getUser) {
      this.setState({ profileCredential: data.getUser.profile_credential });
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
      profileCredential
    } = this.state;

    if (!this.props.data.getUser) {
      return <div />;
    }
    // const { getUser } = this.props.data;
    return (
      <Layout isAuth>
        <div>
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
                />
                <Column>
                  <Columns>
                    <Feeds />
                    <ActiveFeed />
                  </Columns>
                </Column>
              </Column>
              <Column size="is3">
                <Credentials
                  toggleCredentialAddModal={this.toggleCredentialAddModal}
                />
                <Knowledge
                  toggleCredentialAddModal={this.toggleCredentialAddModal}
                />
              </Column>
            </Columns>
          </Column>
          <AddEmployment credentialAddModal={credentialAddModal} toggleCredentialAddModal={this.toggleCredentialAddModal} />
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
  graphql(QUERY_GET_USER, {options: ({ id }) => ({ variables: { id } })})
)(UserProfile));
