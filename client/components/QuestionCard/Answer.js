import { Content } from 're-bulma';
import Truncate from '../Truncate';
import { sanitize } from '../../util/sanitize';

export default function Answer({ content }) {
  return (
    <Content>
      <Truncate text={sanitize(content)} />
    </Content>
  );
}
