import { Column } from 're-bulma';
import Item from './Item';
import style from './style';

export default function NavItem({ currentPath }) {
  return (
    <Column align="center" size="is8" style={style.progessCol}>
      <Item icon="fa fa-file-text" title="Home" path={currentPath} />
      <Item icon="fa fa-pencil-square-o" title="Answer" path={currentPath} />
    </Column>
  );
}
