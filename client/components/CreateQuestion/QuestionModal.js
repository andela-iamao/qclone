import { Modal, Button, Checkbox } from 're-bulma';
import Header from './Header';
import style from './style.js';

export default function QuestionModal(props) {
  return (
    <Modal
      type="card"
      headerContent={
        <Header {...props} />
      }
      isActive={props.openModal}
      onCloseRequest={props.closeModal}
    >
      <div style={style.footer}>
        <a className="mute-link" onClick={props.closeModal}>Close</a>
        <Checkbox style={{ display: 'inline' }}><a href="#" className="mute-link">Ask Anoymously</a></Checkbox>
        {props.isEditing ?
          <Button color="isInfo" style={style.askButton} onClick={props.handleUpdateQuestion}>
            {props.askingQuestion ? 'Updating...': 'Update'}
          </Button>
          :
          <Button color="isInfo" style={style.askButton} onClick={props.handleCreateQuestion}>
            {props.askingQuestion ? 'Asking...': 'Ask Question'}
          </Button>
        }
      </div>
    </Modal>
  );
}
