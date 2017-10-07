import dynamic from 'next/dynamic';
import { Button } from 're-bulma';
import moment from 'moment';
import AnswerDock from '../AnswerDock';
const Wysiwyg = dynamic(import('../../Wysiwyg'));

export default function QuestionCard(props) {
  return (
    <div>
      <div className="answer-page-question-card">
        {props.passedQuestions.includes(props.id) ?
          <div className="answer-page-question-card-passed-question">
            <h2>{props.content}</h2>
            <small>You passed on answering this question · <a href="#" onClick={() => props.passQuestion(props.id)} className="mute-link">Undo</a></small><br />
            <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
              <a onClick={() => props.handleFollowQuestion(props.id)} className="mute-link">
                Downvote
              </a>
            </span>
          </div>
          :
          <div>
            <div className="answer-page-question-card-question">
              <small>Question asked · {props.topicsInfo.length > 0 ? props.topicsInfo[0].title : ''}</small>
              <h2>
                <a href="" className="header-link">
                  {props.content}
                </a>
              </h2>
              <small>Asked {moment(props.created_at).fromNow()} {props.answers.length > 0 && ` · ${props.answers.length} Answers`}</small><br /><br />
              <div className="answer-page-question-card-actions">
                <span>
                  <a href="#" className="Button WriteAnswer" onClick={() => props.toggleAnswer(props.id)}>
                    <span>{props.ownAnswer && props.ownAnswer.id ? 'Edit Answer' : 'Answer'}</span>
                  </a>
                  <Button style={{ marginLeft: 10 }} onClick={() => props.passQuestion(props.id)}>Pass</Button>
                  <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
                    <a onClick={() => props.handleFollowQuestion(props.id)} className="mute-link">
                      {props.followers.includes(props.userId) ? 'Following ': 'Follow '}
                    </a>
                    <span className="follow-tag">{props.followers.length}</span>
                  </span>
                  <span style={{ lineHeight: 2.25, marginLeft: 10 }}>
                    <a onClick={() => props.handleFollowQuestion(props.id)} className="mute-link">
                      Downvote
                    </a>
                  </span>
                </span>
              </div>
            </div>
            {props.drafts[props.id].open &&
              <AnswerDock
                id={props.id}
                content={props.drafts[props.id].answerEditable}
                submitAnswer={props.handleAnswerSubmit}
                handleAnswerChange={props.handleAnswerChange}
                openTooltip={props.openTooltip}
                tooltip={props.tooltip}
                user={{
                  name: props.username,
                  profileCredential: props.profile_credential,
                  profilePhoto: props.profile_photo
                }}
              />
            }
          </div>
        }
      </div>
    </div>
  );
}
