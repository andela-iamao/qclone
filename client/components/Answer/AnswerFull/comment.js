import { Columns, Column, Input, Button } from 're-bulma';
import style from '../style';

export default class Comment extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      comment: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ comment: event.target.value });
  }
  render() {
    const { props, state } = this;
    return (
      <Columns style={style.answerFull.comment}>
        <Column size="is1">
          <img style={style.answerFull.commentAvatar} src={props.avatar} />
        </Column>
        <Column size="is8">
          <Columns>
            <Column size={state.comment.length > 0 ? 'is8' : 'is12'}>
              <Input placeholder="Add a comment..." value={state.comment} onChange={this.handleChange} name="comment"/>
            </Column>
            {state.comment.length > 0 &&
              <Column size="is4">
                <Button color="isPrimary">Comment</Button>
              </Column>
            }
          </Columns>
        </Column>
        <Column size="is3">
          <span style={style.answerFull.commentThird}>Recommended All</span>
        </Column>
      </Columns>
    );
  }
}
