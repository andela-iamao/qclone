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
            <a onClick={() => props.toggleCredentialAddModal('education')}><b>Add educational credential</b></a>
          </Column>
        </Columns>
        <Columns>
          <Column size="is1">
            <span className="fa fa-map-marker"/>
          </Column>
          <Column >
            <a onClick={() => props.toggleCredentialAddModal('location')}><b>Add location credential</b></a>
          </Column>
        </Columns>
      </Column>
    </Column>
  );
}
