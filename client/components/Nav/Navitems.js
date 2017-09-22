import Link from 'next/link';
import { Button, Column, Columns, Input } from 're-bulma';
import Item from './Item';
import Tooltip from '../Tooltip';
import style from './style';
import { getUserId } from '../../util/auth';

// const { getUserId } = dynamic(import('../../util/auth'));

export default function NavItem({ currentPath }) {
  // console.log('auth', auth);
  return (
    <Columns size="is12">
      <Column align="center" size="is6" style={style.progessCol}>
        <Item icon="fa fa-file-text" title="Home" path={currentPath} />
        <Item icon="fa fa-pencil-square-o" title="Answer" path={currentPath} />
        <Item icon="fa fa-bell" title="Notification" path={currentPath} />
      </Column>
      <Column size="is6">
        <Columns >
          <Column size="is12" style={{ marginTop: 20 }}>
            <Input
              placeholder="Search..."
              icon="fa fa-search"
              hasIconLeft
            />
          </Column>
          <Column size="is6">
            <div style={{ borderBottom: '2px solid #b92b27' }} className="navbar-avatar-section">
              <img
                src="https://qph.ec.quoracdn.net/main-thumb-138684411-50-wtqmfujaumbklivtgndzihiqhpwfkhrs.jpeg"
                style={{ width: 26, height: 26, borderRadius: '50%', marginTop: 10 }}
              />
              <div style={{ marginTop: 25, position: 'relative'}}>
                <Tooltip tip="center">
                  <ul>
                    <li style={style.tooltipLi}><Link href={`/profile/${getUserId()}`}>Profile</Link></li>
                    <li style={style.tooltipLi}>Messages</li>
                    <li style={style.tooltipLi}>Your Content</li>
                    <li style={style.tooltipLi}>Stats</li>
                    <li style={style.tooltipLi}>Settings</li>
                  </ul>
                </Tooltip>
              </div>
            </div>
            <div className="navbar-ask-question-button">
              <Button className="quora-link" style={{ marginTop: 20 }}>Ask Question</Button>
            </div>
          </Column>
        </Columns>
      </Column>
    </Columns>
  );
}
