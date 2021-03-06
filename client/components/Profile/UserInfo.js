import dynamic from 'next/dynamic';
import { Columns, Column, Button, Modal } from 're-bulma';
import CustomDropzone from './CustomDropzone';
import { getUserId } from '../../util/auth';

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
            {getUserId() === props.id &&
              <div className="profile-img-actions">
                <span className="profile-img-remove fa fa-close" onClick={props.toggleImageDelete} />
                <div className="profile-img-edit" onClick={props.toggleUpload}>
                  Edit Photo
                </div>
              </div>
            }
          </div>
        </Column>
        <Column>
          <br />
          <div className="profile-user-name">
            <span>{props.firstname} {props.lastname} </span>
            {getUserId() === props.id && <span className="profile-mute-text" id="profile-edit-name">Edit</span>}
          </div>
          {props.profile_credential.length === 0 && getUserId() === props.id ?
            <span className="profile-mute-text" onClick={() => props.toggleCredentialAddModal('profile_credential')}>
              Add profile credential
            </span>
            :
            <div className="profile-credential">
              {props.profile_credential} {getUserId() === props.id &&
                <span
                  className="profile-mute-text profile-credential-edit"
                  onClick={() => props.toggleCredentialAddModal('profile_credential')}>
                    Edit
                </span>}
            </div>
          }
          {props.editingDescription && getUserId() === props.id ?
            <div>
              <Wysiwyg value={props.description} handleChange={props.handleChange}/>
              <div className="delete-image-actions">
                <br />
                <a className="mute-link" onClick={props.editDescription}>Cancel</a>
                <Button color="isPrimary" onClick={() => props.handleUpdate('description')}>Update</Button>
              </div>
            </div>
            :
            <div>
              {props.description.length > 0 && props.description !== '<p><br></p>' ?
                <div className="profile-user-description">
                  <p className="profile-description-content" dangerouslySetInnerHTML={{ __html: props.description }} />
                  {getUserId() === props.id && <span className="profile-mute-text profile-user-description-edit" onClick={props.editDescription}>Edit</span>}
                </div>
                :
                getUserId() === props.id &&
                  <span
                    className="profile-mute-text"
                    onClick={props.editDescription}>
                      Write a description about yourself
                  </span>
              }
            </div>
          }
          <br />
          <Button state={getUserId() === props.id ? 'isDisabled' : 'isActive'}>Followers | 1</Button>
          <span className="profile-mute-text profile-user-info-ellipse fa fa-ellipsis-h" />
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
    </Column>
  );
}
