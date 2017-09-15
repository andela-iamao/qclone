import { Column, Modal, Button, Checkbox } from 're-bulma';
import Header from './Header';
import style from './style.js';
export default function CreateQuestion(props) {
  return (
    <Column style={style.questionBox}>
      <h4>{props.username}</h4>
      <h3 className="pointer" onClick={props.toggleQuestioModal}>Ask your question</h3>
      <Modal
        type="card"
        headerContent={
          <Header {...props} />
        }
        isActive={props.openModal}
        onCloseRequest={props.toggleQuestioModal}
      >
        <div style={style.footer}>
          <a className="mute-link" onClick={props.toggleQuestioModal}>Close</a>
          <Checkbox style={{ display: 'inline' }}><a href="#" className="mute-link">Ask Anoymously</a></Checkbox>
          <Button color="isInfo" style={style.askButton} onClick={props.handleCreateQuestion}>
            {props.askingQuestion ? 'Asking...': 'Ask Question'}
          </Button>
        </div>
      </Modal>
    </Column>
  );
}
