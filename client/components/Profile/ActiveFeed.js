import { Hero, HeroBody, Container, Column } from 're-bulma';

export default function ActiveFeed() {
  return (
    <Column>
      <h3>Answers</h3>
      <hr />
      <div className="profile-active-feed">
        <Hero>
          <HeroBody>
            <Container>
              <span className="profile-mute-text-no-underline">You haven't answered any questions yet.</span><br />
              <a>Answer your first question</a>
            </Container>
          </HeroBody>
        </Hero>
      </div>
    </Column>
  );
}
