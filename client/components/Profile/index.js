import { Columns, Column } from 're-bulma';
import Layout from '../Layout';
import ActiveFeed from './ActiveFeed';
import Credentials from './Credentials';
import Feeds from './Feeds';
import Knowledge from './Knowledge';
import UserInfo from './UserInfo';
import { AddEmployment, AddEducation, AddKnowledge, AddTopic, AddLocation, EditCredentials } from './Modals';
import style from './style';

export default class MyComponent extends React.Component {

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
      credentialTooltip: false
    };
    this.toggleUpload = this.toggleUpload.bind(this);
    this.editDescription = this.editDescription.bind(this);
    this.toggleCredentials = this.toggleCredentials.bind(this);
    this.toggleImageDelete = this.toggleImageDelete.bind(this);
    this.toggleEmploymentModal = this.toggleEmploymentModal.bind(this);
    this.toggleCredentialAddModal = this.toggleCredentialAddModal.bind(this);
    this.toggleCredentialTooltip = this.toggleCredentialTooltip.bind(this);
  }

  componentDidMount() {

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

  toggleEmploymentModal() {
    this.setState({ employmentModal: !this.state.employmentModal });
  }

  toggleCredentialAddModal(cred) {
    this.setState({ credentialAddModal: cred ? cred : '' });
  }

  toggleCredentialTooltip() {
    this.setState({ credentialTooltip: !this.state.credentialTooltip });
  }

  render() {
    const { uploadModal, deleteImageModal, credentialTooltip, credentialModal, editingDescription, employmentModal, credentialAddModal } = this.state;
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
                  toggleEmploymentModal={this.toggleEmploymentModal}
                  employmentModal={employmentModal}
                  credentialAddModal={credentialAddModal}
                  toggleCredentialAddModal={this.toggleCredentialAddModal}
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
