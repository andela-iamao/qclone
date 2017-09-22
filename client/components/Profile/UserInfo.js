import dynamic from 'next/dynamic';
import { Columns, Column, Button, Modal, Input, Icon } from 're-bulma';
import CustomDropzone from './CustomDropzone';
const Wysiwyg = dynamic(import('../Wysiwyg'));

export default function UserInfo(props) {
  return (
    <Column className="profile-user-info-col">
      <Columns>
        <Column size="is3" className="profile-img-container">
          <div >
            <div className="profile-img">
              <img src={props.profile_photo} />
            </div>
            <div className="profile-img-actions">
              <span className="profile-img-remove fa fa-close" onClick={props.toggleImageDelete} />
              <div className="profile-img-edit" onClick={props.toggleUpload}>
                Edit Photo
              </div>
            </div>
          </div>
        </Column>
        <Column>
          <br />
          <span className="profile-user-name">{props.firstname} {props.lastname}</span>
          <span className="profile-mute-text" id="profile-edit-name">Edit</span><br />
          <span className="profile-mute-text" onClick={props.toggleCredentials}>Add profile credential</span><br /><br />
          {props.editingDescription ?
            <div>
              <Wysiwyg />
              <div className="delete-image-actions">
                <br />
                <a className="mute-link" onClick={props.editDescription}>Cancel</a>
                <Button color="isPrimary">Update</Button>
              </div>
            </div>
            :
            <span className="profile-mute-text" onClick={props.editDescription}>Write a description about yourself</span>
          }
          <br /><br />
          <Button state="isDisabled">Followers | 1</Button>
          <span className="profile-mute-text profile-user-info-ellipse fa fa-ellipsis-h" /><br /><br />
        </Column>
      </Columns>
      <div className="profile-user-info-modal">
        <Modal
          type="card"
          headerContent="Edit Profile Photo"
          isActive={props.uploadModal}
          onCloseRequest={props.toggleUpload}
        >
          <CustomDropzone onDrop={props.onDrop} />
        </Modal>
      </div>
      <div className="profile-user-info-modal profile-delete-image-modal">
        <Modal
          type="card"
          isActive={props.deleteImageModal}
          onCloseRequest={props.toggleImageDelete}
        >
          <p className="dropzone-subtitle">Remove Profile Photo</p>
          <p>Are you sure you want to remove your profile photo?</p>
          <div className="delete-image-actions">
            <a className="mute-link" onClick={props.toggleImageDelete}>Cancel</a>
            <Button color="isPrimary" onClick={() => props.handleUpload(null, true)}>Remove Photo</Button>
          </div>
        </Modal>
      </div>
      <div>
        <Modal
          type="card"
          headerContent={
            <div className="profile-add-credentials-modal">
              <span className="pacm-header">Edit Credentials</span><br />
              <span className="pacm-sub">Credentials also appear on answers you write.</span>
            </div>
          }
          isActive={props.credentialModal}
          onCloseRequest={props.toggleCredentials}
        >
          <div className="profile-add-credentials-modal-body">
            <span><Icon style={{ color: '#C0C0C0' }} icon="fa fa-user" /> <b>Add profile credential</b></span><br />
            <Input placeholder="15 years as a college admissions officer"/>
            <div className="delete-image-actions">
              <a className="mute-link" onClick={props.toggleCredentials}>Cancel</a>
              <Button color="isPrimary">Save</Button>
            </div>
          </div>
        </Modal>
      </div>
    </Column>
  );
}
