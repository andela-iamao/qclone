import { Column, Button } from 're-bulma';
import Overlay from '../Overlay';
import Interest from '../Interests';
import style from './style';

export default class SelectInterests extends React.Component {

  render() {
    const { selected, handleCheck, handleSubmit, topics } = this.props;
    const remainder = 1 - selected.length;
    return (
      <div>
        <Overlay span="full" bg="light">
          <Column size="is6" style={style.col}>
            <h2>What are your interests?</h2>
            <Column style={style.interestsCol}>
              {topics && topics.map((topic) => (
                <Interest
                  active={selected.includes(topic.id)}
                  key={topic.id}
                  {...topic}
                  handleCheck={handleCheck} />
              ))
              }
            </Column>
            <Column style={style.actionCol}>
              <Button color="isInfo" state={remainder > 0 ? 'isDisabled' : 'isActive'} onClick={handleSubmit}>
                {remainder > 0 ? `${remainder} More Topics to Continue` : 'Coninue'}
              </Button>
            </Column>
          </Column>
        </Overlay>
      </div>
    );
  }
}
