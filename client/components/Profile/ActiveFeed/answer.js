import { Hero, HeroBody, Container, Column, Columns, Button } from 're-bulma';
import moment from 'moment';
import Comment from '../../Answer/AnswerFull/comment';
import Social from '../social';
import { getUserId } from '../../../util/auth';
import { sanitize } from '../../../util/sanitize';

export default class Answer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: false,
      answers: [...props.answers].reduce((a, b) => {
        let mutB = {...b};
        mutB.content = b.content.length > 100 ? `${sanitize(mutB.content).slice(0, 100)}...` : mutB.content;
        mutB.isTruncated = b.content.length > 100;
        a[mutB.id] = mutB;
        return a;
      }, {})
    };
    this.setActive = this.setActive.bind(this);
  }

  setActive() {
    this.setState({ active: !this.state.active });
  }

  render() {
    const { props, state } = this;
    return (
      <Column size="is12" style={{ paddingLeft: 0, paddingRight: 0 }}>
        {props.answers.length === 0 ?
          <Hero>
            <HeroBody>
              <Container>
                <span className="profile-mute-text-no-underline">You {'haven\'t'} answered any questions yet.</span><br />
                <a>Answer your first question</a>
              </Container>
            </HeroBody>
          </Hero>
          :
          [...props.answers].reverse().map((answer) => (
            <div key={answer.id} className="profile-active-feed-answer">
              <h2>{answer.question.content}</h2>
              <Column>
                <Columns>
                  <Column size="is1">
                    <img className="answer-user-photo" src={props.profile_photo} />
                  </Column>
                  <Column style={{ paddingLeft: 20 }}>
                    <span className="profile-active-feed-answer-name">{props.firstname} {props.lastname}</span>
                    <span className="profile-active-feed-answer-credentials">, {props.profile_credential}</span><br />
                    <span className="profile-mute-text">Answered {moment(answer.created_at).fromNow()}</span>
                  </Column>
                </Columns>
              </Column>
              <Column>
                {!state.active ?
                  <p className="answer-content">
                    <span dangerouslySetInnerHTML={{ __html: state.answers[answer.id].content }} />
                    {state.answers[answer.id].isTruncated &&
                      <a onClick={this.setActive}>( more )</a>
                    }
                  </p>
                  :
                  <div>
                    <p className="answer-content" dangerouslySetInnerHTML={{ __html: answer.content }} />
                    <a onClick={this.setActive}>( less )</a>
                  </div>
                }
                <span>{answer.views} View</span>
              </Column>
              <Column>
                <Columns>
                  <Column>
                    <Button state={getUserId() === props.id ? 'isDisabled' : 'isActive'}><b>Upvotes | {answer.upvotes.length}</b></Button>
                  </Column>
                  <Column>
                    <Social
                      share={props.handleShare}
                      openTooltip={props.toggleTooltip}
                      content="What is a good album to listen to, from start to finish?"
                      tooltip={props.tooltip}
                      handleDelete={props.handleDelete}
                      handleEdit={props.handleEdit}
                      deleted={props.deleted}
                      twitterText={props.twitterText}
                    />
                  </Column>
                </Columns>
                <Column>
                  <Comment
                    comment={props.comment}
                    avatar={props.profile_photo}
                    handleChange={props.handleChange}
                  />
                </Column>
              </Column>
            </div>
          ))
        }
      </Column>
    );
  }
}
