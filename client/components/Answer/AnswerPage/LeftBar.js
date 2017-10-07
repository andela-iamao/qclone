import Link from 'next/link';

export default function Leftbar(props) {
  return (
    <div style={{ position: 'fixed' }}>
      <div className="home-user-feeds-head">
        <span style={{ clear: 'both' }}/>
        <span className="home-user-feeds">Questions</span><br />
      </div>
      <div className="home-feeds-list">
        <ul>
          <Link href="/answer"><li className={props.active === 'foryou' ? 'active' : ''}>Questions For You</li></Link>
          <Link href="/answer/requests"><li className={props.active === 'requests' ? 'active' : ''}>Answer Requests</li></Link>
          <Link href="/answer/answer_later"><li className={props.active === 'later' ? 'active' : ''}>Answer Later</li></Link>
          <Link href="/answer/drafts"><li className={props.active === 'drafts' ? 'active' : ''}>Drafts</li></Link>
        </ul>
      </div>
    </div>
  );
}
