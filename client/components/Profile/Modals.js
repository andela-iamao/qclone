import { Modal, Icon, Input, Button, Select, Tag, Column, Columns, Checkbox } from 're-bulma';
import _ from 'lodash';
import Tooltip from '../Tooltip';


export function AddEmployment(props) {
  let { position, company, active } = props.employment;
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
              <Column><Input name="position" value={position} onChange={(event) => props.handleChange('employment', event)}/></Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>Company/Organization</p></Column>
              <Column><Input name="company" value={company} onChange={(event) => props.handleChange('employment', event)} /></Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>Start Year</p></Column>
              <Column>
                <Select className="start" onChange={(event) => props.handleChange('employment', { ...event, target: { value: event.target.value, name: 'start' } })}>{
                  Array.from(new Array(118),(val,index) => (
                    <option value={index + 1900} key={`start-${index + 1900}`}>{index + 1900}</option>
                  )).reverse()
                }</Select>
              </Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>End Year</p></Column>
              <Column>
                <Select className="end" onChange={(event) => props.handleChange('employment', { ...event, target: { value: event.target.value, name: 'end' } })}>{
                  Array.from(new Array(118),(val,index) => (
                    <option value={index + 1900} key={`end-${index + 1900}`}>{index + 1900}</option>
                  )).reverse()
                }</Select>
              </Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>I currently work here</p></Column>
              <Column>
                <span onClick={() => props.handleChange('employment', { target: { value: !active, name: 'active' } })}>
                  <Checkbox />
                </span>
              </Column>
            </Columns>
          </div>
          <div className="delete-image-actions">
            <a className="mute-link" onClick={props.toggleCredentialAddModal}>Cancel</a>
            <Button color="isPrimary" onClick={() => props.handleSubmit('employment')}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function AddEducation(props) {
  let { school, concentration, secondary_concentration, degree_type } = props.education;
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
              <Column><Input name="school" value={school} onChange={(event) => props.handleChange('education', event)} /></Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>Concentration</p></Column>
              <Column><Input name="concentration" value={concentration} onChange={(event) => props.handleChange('education', event)} /></Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>Secondary Concentration</p></Column>
              <Column><Input name="secondary_concentration" value={secondary_concentration} onChange={(event) => props.handleChange('education', event)} /></Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>Degree Type</p></Column>
              <Column><Input name="degree_type" value={degree_type} onChange={(event) => props.handleChange('education', event)} /></Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>Graduation Year</p></Column>
              <Column>
                <Select onChange={(event) => props.handleChange('education', { ...event, target: { value: event.target.value, name: 'graduation_year' } })}>{
                  Array.from(new Array(124),(val,index) => (
                    <option value={index + 1900} key={`education-grad-${index + 1900}`}>{index + 1900}</option>
                  )).reverse()
                }</Select>
              </Column>
            </Columns>
          </div>
          <div className="delete-image-actions">
            <a className="mute-link" onClick={props.toggleCredentialAddModal}>Cancel</a>
            <Button color="isPrimary" onClick={() => props.handleSubmit('education')}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function EditCredentials(props) {
  const { education, location, employment } = props;
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
          <div className="profile-add-credentials-tooltip-box" style={{ top: '40%' }}>
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
          {employment.map((ed) => (
            <div key={ed.id} className="profile-edit-credentials-credential">
              <Icon icon="fa fa-briefcase" />{ed.company} ({ed.start} - {ed.active ? 'Present' : ed.end}) ·
              <span className="profile-mute-text"> Default</span> ·
              <span
                className="profile-mute-text"
                onClick={() => props.toggleCredentialAddModal(
                  'employment',
                  _.pick(ed, ['id', 'position', 'company', 'start', 'end', 'active']))}
              > Edit
              </span>
            </div>
          ))
          }
          {education.map((ed) => (
            <div key={ed.id} className="profile-edit-credentials-credential">
              <Icon icon="fa fa-graduation-cap" />{ed.degree_type} at {ed.school} ({ed.graduation_year}) ·
              <span className="profile-mute-text"> Default</span> ·
              <span className="profile-mute-text"
                onClick={() => props.toggleCredentialAddModal(
                  'education',
                  _.pick(ed, ['id', 'school', 'graduation_year', 'concentration', 'secondary_concentration', 'degree_type']))}
              > Edit
              </span>
            </div>
          ))
          }
          {location.map((ed) => (
            <div key={ed.id} className="profile-edit-credentials-credential">
              <Icon icon="fa fa-map-marker" />Lives in {ed.location} ({ed.start} - {ed.active ? 'Present' : ed.end}) ·
              <span className="profile-mute-text"> Default</span> ·
              <span className="profile-mute-text"
                onClick={() => props.toggleCredentialAddModal(
                  'location',
                  _.pick(ed, ['id', 'location', 'start', 'end', 'active']))}
              > Edit
              </span>
            </div>
          ))
          }
        </div>
      </Modal>
    </div>
  );
}

export function AddLocation(props) {
  let { location, active } = props.location;
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
              <Column>
                <Input name="location" value={location} onChange={(event) => props.handleChange('location', event)} />
              </Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>Start Year</p></Column>
              <Column>
                <Select onChange={(event) => props.handleChange('location', { ...event, target: { value: event.target.value, name: 'start' } })}>{
                  Array.from(new Array(118),(val,index) => (
                    <option value={index + 1900} key={`location-start-${index+1900}`}>{index + 1900}</option>
                  )).reverse()
                }</Select>
              </Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>End Year</p></Column>
              <Column>
                <Select onChange={(event) => props.handleChange('location', { ...event, target: { value: event.target.value, name: 'end' } })}>{
                  Array.from(new Array(118),(val,index) => (
                    <option key={`location-end-${index+1900}`} value={index + 1900}>{index + 1900}</option>
                  )).reverse()
                }</Select>
              </Column>
            </Columns>
            <Columns>
              <Column size="is3"><p>I currently live here</p></Column>
              <Column>
                <span onClick={() => props.handleChange('location', { target: { value: !active, name: 'active' } })}>
                  <Checkbox />
                </span>
              </Column>
            </Columns>
          </div>
          <div className="delete-image-actions">
            <a className="mute-link" onClick={props.toggleCredentialAddModal}>Cancel</a>
            <Button color="isPrimary" onClick={() => props.handleSubmit('location')}>Save</Button>
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
          <Input placeholder="What topics do you know about" onChange={props.handleSearch} value={props.query} />
        </div>
        <div className="profile-add-knowledge-search-dropdown">
          {props.searchResult.map((result) => (
            <div  key={result.id} onClick={() => props.selectKnowledge(result)}>
              <div className="profile-add-knowledge-search-dropdown-topic">
                <div className="profile-add-knowledge-search-dropdown-topic-name">{result.title}</div>
                <div className="profile-add-knowledge-search-dropdown-topic-icon">
                  <img src={result.image} />
                </div>
              </div>
              <div className="profile-add-knowledge-search-dropdown-topic-followers">
                <span className="profile-mute-text-no-underline">155,300 Followers</span>
              </div>
            </div>
          ))}
        </div>
        <div className="profile-add-knowledge-list">
          {props.selected.map((knowledge) => (
            <span key={knowledge.id}>
              <Icon icon="fa fa-close" onClick={() => props.selectKnowledge(knowledge, true)} /> <Tag>{knowledge.title}</Tag><br /><br />
            </span>
          ))}
        </div>
        <div className="delete-image-actions profile-add-knowledge-footer">
          <Button color="isPrimary" onClick={props.toggleCredentialAddModal}>Done</Button>
        </div>
      </Modal>
    </div>
  );
}

export function AddProfileCredentials(props) {
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
        isActive={props.credentialAddModal === 'profile_credential'}
        onCloseRequest={props.toggleCredentialAddModal}
      >
        <div className="profile-add-credentials-modal-body">
          <span><Icon style={{ color: '#C0C0C0' }} icon="fa fa-user" /> <b>Add profile credential</b></span><br />
          <Input
            name="profileCredential"
            placeholder="15 years as a college admissions officer"
            onChange={props.handleInputChange}
            value={props.profileCredential}
          />
          <div className="delete-image-actions">
            <a className="mute-link" onClick={props.toggleCredentialAddModal}>Cancel</a>
            <Button color="isPrimary" onClick={() => props.handleUpdate('profileCredential')}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
