import ReactQuill from 'react-quill';
import style from './style';

export default class Wysiwyg extends React.Component {
  constructor (props) {
    super(props);
    this.state = { editorHtml: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  static modules = {
    toolbar: [['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  }

  static formats = [
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  handleChange (html) {
    this.setState({ editorHtml: html });
  }

  render () {
    const handleChange = this.props.handleChange;
    const value = this.props.value || this.state.editorHtml;
    const placeholder = this.props.placeholder || 'Write your answer';
    return (
      <div style={style.editorContainer}>
        <ReactQuill
          onChange={handleChange}
          value={value}
          modules={Wysiwyg.modules}
          formats={Wysiwyg.formats}
          bounds={'.app'}
          placeholder={placeholder}
        />
      </div>
    );
  }
}
