import { Modal, Icon, Input, Button, Select, Tag, Column, Columns, Checkbox } from 're-bulma';
import Tooltip from '../Tooltip';


export function AddEmployment(props) {
  return (
    <div>
      <Modal
        type="card"
        headerContent={
          <div className="profile-add-credentials-modal">
            <span className="pacm-header">Edit Credentials</span><br />
            <span className="pacm-sub">Credentials also appear on answers you write.</span>
          </div>
        }
        isActive={props.credentialAddModal === 'employment'}
        onCloseRequest={props.toggleCredentialAddModal}
      >
        <div className="profile-add-credentials-modal-body">
          <span><Icon style={{ color: '#C0C0C0' }} icon="fa fa-briefcase" /> <b>Add employment credential</b></span><br /><br />
          <div className="profile-employment-add-list">
            <Columns>
              <Column size="is3"><p>Position</p></Column>
              <Column><Input /></Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>Company/Organization</p></Column>
              <Column><Input /></Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>Start Year</p></Column>
              <Column>
                <Select>{
                  Array.from(new Array(118),(val,index) => (
                    <option value={index + 1900} key={index + 1900}>{index + 1900}</option>
                  )).reverse()
                }</Select>
              </Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>End Year</p></Column>
              <Column>
                <Select>{
                  Array.from(new Array(118),(val,index) => (
                    <option value={index + 1900} key={index + 1900}>{index + 1900}</option>
                  )).reverse()
                }</Select>
              </Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>I currently work here</p></Column>
              <Column>
                <Checkbox></Checkbox>
              </Column>
            </Columns>
          </div>
          <div className="delete-image-actions">
            <a className="mute-link" onClick={props.toggleCredentialAddModal}>Cancel</a>
            <Button color="isPrimary">Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function AddEducation(props) {
  return (
    <div>
      <Modal
        type="card"
        headerContent={
          <div className="profile-add-credentials-modal">
            <span className="pacm-header">Edit Credentials</span><br />
            <span className="pacm-sub">Credentials also appear on answers you write.</span>
          </div>
        }
        isActive={props.credentialAddModal === 'education'}
        onCloseRequest={props.toggleCredentialAddModal}
      >
        <div className="profile-add-credentials-modal-body">
          <span><Icon style={{ color: '#C0C0C0' }} icon="fa fa-graduation-cap" /> <b>Add education credential</b></span><br /><br />
          <div className="profile-employment-add-list">
            <Columns>
              <Column size="is3"><p>School</p></Column>
              <Column><Input /></Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>Concentration</p></Column>
              <Column><Input /></Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>Secondary Concentration</p></Column>
              <Column><Input /></Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>Degree Type</p></Column>
              <Column><Input /></Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>Graduation Year</p></Column>
              <Column>
                <Select>{
                  Array.from(new Array(124),(val,index) => (
                    <option value={index + 1900} key={index + 1900}>{index + 1900}</option>
                  )).reverse()
                }</Select>
              </Column>
            </Columns>
          </div>
          <div className="delete-image-actions">
            <a className="mute-link" onClick={props.toggleCredentialAddModal}>Cancel</a>
            <Button color="isPrimary">Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function EditCredentials(props) {
  return (
    <div>
      <Modal
        type="card"
        headerContent={
          <div className="profile-add-credentials-modal">
            <span className="pacm-header">Edit Credentials</span><br />
            <span className="pacm-sub">Credentials also appear on answers you write.</span>
          </div>
        }
        isActive={props.credentialAddModal === 'edit'}
        onCloseRequest={props.toggleCredentialAddModal}
      >
        <div className="profile-add-credentials-div" onClick={props.toggleCredentialTooltip}>
          <Icon icon="fa fa-plus" /> <span>Add a credential</span>
          <div className="profile-add-credentials-tooltip-box">
            <Tooltip open={props.credentialTooltip}>
              <ul>
                <li onClick={() => props.toggleCredentialAddModal('employment')}>
                  <Icon className="gray-icon" icon="fa fa-briefcase"/> Employment
                </li>
                <li onClick={() => props.toggleCredentialAddModal('education')}>
                  <Icon className="gray-icon" icon="fa fa-graduation-cap"/> Education
                </li>
                <li onClick={() => props.toggleCredentialAddModal('location')}>
                  <Icon className="gray-icon" icon="fa fa-map-marker"/> Location
                </li>
                <li onClick={() => props.toggleCredentialAddModal('topic')}>
                  <Icon className="gray-icon" icon="fa fa-male"/> Topic
                </li>
              </ul>
            </Tooltip>
          </div>
        </div>
        <div>
          <div className="profile-edit-credentials-credential">
            <Icon icon="fa fa-briefcase" /> Software Developer (2017-present) ·
            <span className="profile-mute-text"> Default</span> · <span className="profile-mute-text">Edit</span>
          </div>
          <div className="profile-edit-credentials-credential">
            <Icon icon="fa fa-briefcase" /> Software Developer (2017-present) ·
            <span className="profile-mute-text"> Default</span> · <span className="profile-mute-text">Edit</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function AddLocation(props) {
  return (
    <div>
      <Modal
        type="card"
        headerContent={
          <div className="profile-add-credentials-modal">
            <span className="pacm-header">Edit Credentials</span><br />
            <span className="pacm-sub">Credentials also appear on answers you write.</span>
          </div>
        }
        isActive={props.credentialAddModal === 'location'}
        onCloseRequest={props.toggleCredentialAddModal}
      >
        <div className="profile-add-credentials-modal-body">
          <span><Icon style={{ color: '#C0C0C0' }} icon="fa fa-map-marker" /> <b>Add location credential</b></span><br /><br />
          <div className="profile-employment-add-list">
            <Columns>
              <Column size="is3"><p>Location(required)</p></Column>
              <Column><Input /></Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>Start Year</p></Column>
              <Column>
                <Select>{
                  Array.from(new Array(118),(val,index) => (
                    <option value={index + 1900} key={index + 1900}>{index + 1900}</option>
                  )).reverse()
                }</Select>
              </Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>End Year</p></Column>
              <Column>
                <Select>{
                  Array.from(new Array(118),(val,index) => (
                    <option value={index + 1900} key={index + 1900}>{index + 1900}</option>
                  )).reverse()
                }</Select>
              </Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>I currently live here</p></Column>
              <Column>
                <Checkbox></Checkbox>
              </Column>
            </Columns>
          </div>
          <div className="delete-image-actions">
            <a className="mute-link" onClick={props.toggleCredentialAddModal}>Cancel</a>
            <Button color="isPrimary">Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function AddTopic(props) {
  return (
    <div>
      <Modal
        type="card"
        headerContent={
          <div className="profile-add-credentials-modal">
            <span className="pacm-header">Edit Credentials</span><br />
            <span className="pacm-sub">Credentials also appear on answers you write.</span>
          </div>
        }
        isActive={props.credentialAddModal === 'topic'}
        onCloseRequest={props.toggleCredentialAddModal}
      >
        <div className="profile-add-credentials-modal-body">
          <span><Icon style={{ color: '#C0C0C0' }} icon="fa fa-man" /> <b>Add topic credential</b></span><br /><br />
          <div className="profile-employment-add-list">
            <Columns>
              <Column size="is3"><p>Select a topic</p></Column>
              <Column><Input /></Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>Describe an experience</p></Column>
              <Column><Input /></Column>
            </Columns>
          </div>
          <div className="delete-image-actions">
            <a className="mute-link" onClick={props.toggleCredentialAddModal}>Cancel</a>
            <Button color="isPrimary">Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function AddKnowledge(props) {
  return (
    <div>
      <Modal
        type="card"
        headerContent={
          <div className="profile-add-credentials-modal">
            <span className="pacm-header">Edit Knows About Topics</span><br />
            <span className="pacm-sub">Add and remove topics</span>
          </div>
        }
        isActive={props.credentialAddModal === 'knowledge'}
        onCloseRequest={props.toggleCredentialAddModal}
      >
        <div className="profile-add-knowledge-div" onClick={props.toggleCredentialTooltip}>
          <Input placeholder="What topics do you know about"/>
        </div>
        <div className="profile-add-knowledge-search-dropdown">

        </div>
        <div className="profile-add-knowledge-list">
          <span>
            <Icon icon="fa fa-close" /> <Tag>Naruto</Tag><br /><br />
          </span>
          <span>
            <Icon icon="fa fa-close" /> <Tag>Bleach</Tag><br /><br />
          </span>
          <span>
            <Icon icon="fa fa-close" /> <Tag>Attack on titans</Tag><br /><br />
          </span>
        </div>
        <div className="delete-image-actions profile-add-knowledge-footer">
          <Button color="isPrimary">Done</Button>
        </div>
      </Modal>
    </div>
  );
}
