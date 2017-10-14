import { Button } from 're-bulma';
import { AddKnowledge } from '../../Profile/Modals';

export default function SelectTopics(props) {
  return (
    <div className="answer-select-topic-knowledge">
      <span className="react-icon" /><br />
      <span className="answer-select-topic-knowledge-header">Add 5 topics you know about</span><br /><br />
      <span className="answer-select-topic-knowledge-description">Add topics for a customized feed with questions you can answer.</span><br /><br />
      <Button color="isPrimary" onClick={props.toggleCredentialAddModal}>Search for Topic</Button>
      <AddKnowledge
        {...props}
      />
    </div>
  );
}
