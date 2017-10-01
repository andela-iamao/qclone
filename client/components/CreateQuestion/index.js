import { Column, Modal, Button, Checkbox } from 're-bulma';
import QuestionModal from './QuestionModal';
import style from './style.js';
export default function CreateQuestion(props) {
  return (
    <Column style={style.questionBox}>
      <h4>{props.username}</h4>
      <h3 className="pointer" onClick={props.toggleQuestioModal}>Ask your question</h3>
      <QuestionModal
        {...props}
        closeModal={props.toggleQuestioModal}
      />
    </Column>
  );
}
