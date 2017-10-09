import Link from 'next/link';
import { Button, Column, Columns, Input } from 're-bulma';
import Item from './Item';
import NotificationBox from './NotificationBox';
import style from './style';
import { getUserId } from '../../util/auth';

export default function NavItem({ showNotifications, actions, notifications, askQuestion, currentPath, tooltip, toggleTooltip, avatar }) {
  return (
    <Columns size="is12">
      <Column align="center" size="is6" style={style.progessCol}>
        <Item icon="fa fa-file-text" title="Home" path={currentPath} href="/"/>
        <Item icon="fa fa-pencil-square-o" title="Answer" path={currentPath} href="/answer"/>
        <Item icon="fa fa-bell" title="Notification" path={currentPath} href="#"/>
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
            <div
              style={{ borderBottom: window.location.href.indexOf('profile') !== -1 ? '2px solid #b92b27' : 'none', cursor: 'pointer' }}
              className="navbar-avatar-section"
              id="image-nav-container"
              onClick={toggleTooltip}>
              <img
                src={avatar}
                style={{ width: 26, height: 26, borderRadius: '50%', marginTop: 10 }}
              />
              <div style={{ position: 'absolute', top: 15, right: '23%'}}>
                <div
                  className={`hover_menu ${tooltip ? 'nav-hover_menu-active': ''} show_nub right_align fixed_menu_width no_body_attach`}
                  style={{ right: 0, top: '35px' }}>
                  <div>
                    <ul>
                      <Link as={`/profile/${getUserId()}`} href={`/profile?id=${getUserId()}`}><li style={style.tooltipLi}>Profile</li></Link>
                      <li style={style.tooltipLi}>Messages</li>
                      <li style={style.tooltipLi}>Your Content</li>
                      <li style={style.tooltipLi}>Stats</li>
                      <Link as={`/settings/${getUserId()}`} href={`/settings?id=${getUserId()}`}><li style={style.tooltipLi}>Settings</li></Link>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="navbar-ask-question-button">
              <Button className="quora-link" style={{ marginTop: 20 }} onClick={askQuestion}>Ask Question</Button>
            </div>
          </Column>
        </Columns>
      </Column>
      {showNotifications &&
        <NotificationBox
          notifications={notifications}
          actions={actions}
        />
      }
    </Columns>
  );
}
