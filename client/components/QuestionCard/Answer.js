import { Content } from 're-bulma';
import Truncate from '../Truncate';

export default function Answer({ content }) {
  return (
    <Content>
      <Truncate text={content} />
    </Content>
  );
}
