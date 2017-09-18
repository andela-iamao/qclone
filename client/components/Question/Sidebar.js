import { Column, Subtitle } from 're-bulma';

export default function Sidebar() {
  return (
    <Column>
      <Column>
        <h3>Related Question</h3>
        <hr />
        <ul className="sidebar-ul li-to-ul">
          <li><a href="#"><Subtitle size="is6">Why do so many people make Facebook fake accounts?</Subtitle></a></li>
          <li><a href="#"><Subtitle size="is6">Why do so many people make Facebook fake accounts?</Subtitle></a></li>
          <li><a href="#"><Subtitle size="is6">Why do so many people make Facebook fake accounts?</Subtitle></a></li>
          <li><a href="#"><Subtitle size="is6">Why do so many people make Facebook fake accounts?</Subtitle></a></li>
          <li><a href="#"><Subtitle size="is6">Why do so many people make Facebook fake accounts?</Subtitle></a></li>
          <li><a href="#"><Subtitle size="is6">Why do so many people make Facebook fake accounts?</Subtitle></a></li>
          <li><a href="#"><Subtitle size="is6">Why do so many people make Facebook fake accounts?</Subtitle></a></li>
          <li><a href="#" className="mute-link">More related questions</a></li>
        </ul>
      </Column>
      <Column>
        <h3>Question Stats</h3>
        <hr />
        <ul className="sidebar-ul li-to-ul">
          <li><Subtitle size="is6"><i className="fa fa-users" /> 4 Public followers</Subtitle></li>
          <li><Subtitle size="is6"><i className="fa fa-eye" /> Views</Subtitle></li>
          <li><Subtitle size="is6"><i className="fa fa-refresh" /> Last asked 14m ago</Subtitle></li>
          <li><Subtitle size="is6"><i className="fa fa-align-left" /> Edits</Subtitle></li>
        </ul>
      </Column>
    </Column>
  );
}
