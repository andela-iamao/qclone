import Link from 'next/link';
import { Hero, HeroBody, Container, Column, Columns } from 're-bulma';
import Social from '../social';

export default function Answer (props) {
  return (
    <div>
      {props.questions.length === 0 ?
        <Hero>
          <HeroBody>
            <Container>
              <span className="profile-mute-text-no-underline">You asked any questions yet.</span><br />
              <a>Ask your first question</a>
            </Container>
          </HeroBody>
        </Hero>
        :
        [...props.questions].reverse().map((question) => (
          <div key={question.id} className="profile-active-feed-answer">
            <Link href={`/question/${question.id}`}>
              <h2 style={{ cursor: 'pointer' }}>{question.content}</h2>
            </Link>
            <Column>
              <Columns>
                <Column>
                  <a href="#" className="Button WriteAnswer">
                    <span>Answer</span>
                  </a>
                  <span> <a href="#" className="mute-link">Following</a><span className="square-tags">{question.followers.length}</span>
                  </span>
                  <span> <a href="#" className="mute-link">Downvote</a></span>
                </Column>
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
              </Columns>
            </Column>
          </div>
        ))
      }
    </div>
  );
}
