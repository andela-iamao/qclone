import Link from 'next/link';

const Leftbar = (props) => {
  return (
    <div style={{ position: 'fixed', width: 150 }}>
      <div className="home-user-feeds-head">
        <span style={{ clear: 'both' }}/>
        <span className="home-user-feeds">Settings</span><br />
      </div>
      <div className="home-feeds-list">
        <ul>
          <Link href="/settings"><li className={props.active === 'account' ? 'active' : ''}>Account</li></Link>
          <Link href="/settings/privacy"><li className={props.active === 'privacy' ? 'active' : ''}>Privacy</li></Link>
          <Link href="/settings/notifications"><li className={props.active === 'notifications' ? 'active' : ''}>Email & Notifications</li></Link>
        </ul>
      </div>
    </div>
  );
};

export default Leftbar;
