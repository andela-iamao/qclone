import Link from 'next/link';

const Leftbar = (props) => {
  return (
    <div style={{ position: 'fixed', width: 150 }}>
      <div className="home-user-feeds-head">
        <span style={{ clear: 'both' }}/>
        <span className="home-user-feeds">Notifications</span><br />
      </div>
      <div className="home-feeds-list">
        <ul>
          <Link href="/notifications"><li className={props.active === 'all' ? 'active' : ''}>All Notifications</li></Link>
        </ul>
      </div>
      <br/><br/><br/>
      <div className="home-user-feeds-head">
        <span style={{ clear: 'both' }}/>
        <span className="home-user-feeds">Filter By Type</span><br />
      </div>
      <div className="home-feeds-list">
        <ul>
          <Link href="/notifications/answer"><li className={props.active === 'answer' ? 'active' : ''}>Answers</li></Link>
          <Link href="/notifications/people"><li className={props.active === 'people' ? 'active' : ''}>People</li></Link>
          <Link href="/notifications/comments"><li className={props.active === 'comment' ? 'active' : ''}>Comments</li></Link>
          <Link href="/notifications/edits"><li className={props.active === 'edit' ? 'active' : ''}>Edits</li></Link>
          <Link href="/notifications/followers"><li className={props.active === 'follower' ? 'active' : ''}>Followers</li></Link>
          <Link href="/notifications/questions"><li className={props.active === 'question' ? 'active' : ''}>Questions</li></Link>
          <Link href="/notifications/requests"><li className={props.active === 'request' ? 'active' : ''}>Requests</li></Link>
          <Link href="/notifications/upvotes"><li className={props.active === 'upvote' ? 'active' : ''}>Upvotes</li></Link>
          <Link href="/notifications/others"><li className={props.active === 'other' ? 'active' : ''}>Others</li></Link>
        </ul>
      </div>
    </div>
  );
};

export default Leftbar;
