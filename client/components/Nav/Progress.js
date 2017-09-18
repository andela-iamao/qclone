import { Column, Progress } from 're-bulma';
import style from './style';

export default function ProgressBar() {
  return (
    <Column align="center" size="is8" style={style.progessCol}>
      <h4 style={style.hTags}>Start</h4>
      <Progress color="isInfo" value="45" size="isSmall" max="100" style={style.progress} />
      <h4 style={style.hTags}>Finish</h4>
    </Column>
  );
}
