import { Columns, Column } from 're-bulma';
import { getUserId } from '../../util/auth';

export default function Credentials(props) {
  return (
    <Column>
      <h3>Credentials & Highlights
        {getUserId() === props.user.id &&
          <span
            className="profile-mute-text profile-text-right"
            onClick={() => props.toggleCredentialAddModal('edit')}>
            Edit
          </span>
        }
      </h3>
      <hr />
      <Column className="profile-user-credentials">
        <Columns>
          <Column size="is1">
            <span className="fa fa-briefcase"/>
          </Column>
          <Column>
            {props.employment.length === 0 ?
              <a onClick={() => props.toggleCredentialAddModal('employment')}><b>Add employment credential</b></a>
              :
              props.employment.map((job) => (
                <div key={job.id} className="profile-credential-item">
                  <span className="text-black profile-credential-text">{job.position}</span><br />
                  {job.start} - {job.end}<br />
                </div>
              ))
            }
          </Column>
        </Columns>
        <Columns>
          <Column size="is1">
            <span className="fa fa-graduation-cap"/>
          </Column>
          <Column>
            {props.education.length === 0 ?
              <a onClick={() => props.toggleCredentialAddModal('education')}><b>Add educational credential</b></a>
              :
              props.education.map((ed) => (
                <div key={ed.id} className="profile-credential-item">
                  <span className="text-black profile-credential-text">{ed.degree_type} from {ed.school}</span><br />
                  Expected {ed.graduation_year}<br />
                </div>
              ))
            }
          </Column>
        </Columns>
        <Columns>
          <Column size="is1">
            <span className="fa fa-map-marker"/>
          </Column>
          <Column >
            {props.location.length === 0 ?
              <a onClick={() => props.toggleCredentialAddModal('location')}><b>Add location credential</b></a>
              :
              props.location.map((loc) => (
                <div key={loc.id} className="profile-credential-item">
                  <span className="text-black profile-credential-text">{loc.active ? 'Lives' : 'Lived'} in {loc.location}</span><br />
                  {loc.start} - {loc.active ? 'Present' : loc.end}<br />
                </div>
              ))
            }
          </Column>
        </Columns>
      </Column>
    </Column>
  );
}
