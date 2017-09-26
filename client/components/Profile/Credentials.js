import { Columns, Column } from 're-bulma';


export default function Credentials(props) {
  return (
    <Column>
      <h3>Credentials & Highlights <span className="profile-mute-text profile-text-right" onClick={() => props.toggleCredentialAddModal('edit')}>Edit</span></h3>
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
                <div key={job.id}>
                  <b className="text-black">{job.position}</b>
                  <p className="text-mute">{job.start} - {job.end}</p>
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
                <div key={ed.id}>
                  <b className="text-black">{ed.degree_type} from {ed.school}</b>
                  <p className="text-mute">Expected {ed.graduation_year}</p>
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
                <div key={loc.id}>
                  <b className="text-black">{loc.active ? 'Lives' : 'Lived'} in {loc.location}</b>
                  <p className="text-mute">{loc.start} - {loc.active ? 'Present' : loc.end}</p>
                </div>
              ))
            }
          </Column>
        </Columns>
      </Column>
    </Column>
  );
}
