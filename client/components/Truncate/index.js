export default class Truncate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
      isTruncated: true,
      maxLimit: props.limit || 100
    };
    this.open = this.open.bind(this);
    this.truncate = this.truncate.bind(this);
  }

  componentDidMount() {
    this.truncate();
  }

  open() {
    const { text } = this.props;
    return this.setState({ text: text, isTruncated: false});
  }

  truncate() {
    const { text } = this.props;
    if (text.search('</p>')) {
      return this.setState({ text: text.slice(3, text.slice(3).indexOf('<')), isTruncated: true });
    }
    return this.setState({ text: text.slice(0, this.state.maxLimit), isTruncated: true });
  }

  render() {
    if (this.state.text.search('</') > -1) {
      return (
        <span dangerouslySetInnerHTML={{ __html: this.state.text}} />
      );
    }
    return (
      <span>
        {this.state.text} {this.state.isTruncated ?
          <i>...<a onClick={this.open}>(more)</a> </i> : <a onClick={this.truncate}>(less)</a>}
      </span>
    );
  }

}
