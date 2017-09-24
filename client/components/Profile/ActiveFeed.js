import { Hero, HeroBody, Container, Column, Columns, Button } from 're-bulma';
import moment from 'moment';
import Comment from '../Answer/AnswerFull/comment';
import Social from './social';

export default function ActiveFeed(props) {
  return (
    <Column>
      <h3>Answers</h3>
      <hr />
      <div className="profile-active-feed">
        {props.answers.length === 0 ?
          <Hero>
            <HeroBody>
              <Container>
                <span className="profile-mute-text-no-underline">You haven't answered any questions yet.</span><br />
                <a>Answer your first question</a>
              </Container>
            </HeroBody>
          </Hero>
          :
          props.answers.map((answer) => (
            <div key={answer.id} className="profile-active-feed-answer">
              <h2>{answer.question.content}</h2>
              <Column>
                <Columns>
                  <Column size="is1">
                    <img src={props.profile_photo}/>
                  </Column>
                  <Column style={{ paddingLeft: 20 }}>
                    <span className="profile-active-feed-answer-name">{props.fullname}</span>
                    <span className="profile-active-feed-answer-credentials">, Software Developer (2017-present)</span><br />
                    <span className="profile-mute-text">Answered {moment(answer.created_at).fromNow()}</span>
                  </Column>
                </Columns>
              </Column>
              <Column>
                <p dangerouslySetInnerHTML={{ __html: answer.content }} />
                <span>{answer.views} View</span>
              </Column>
              <Column>
                <Columns>
                  <Column>
                    <Button state="isDisabled"><b>Upvotes | {answer.upvotes.length}</b></Button>
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
      </div>
    </Column>
  );
}
