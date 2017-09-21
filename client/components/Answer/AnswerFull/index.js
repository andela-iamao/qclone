// import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button, Column, Modal } from 're-bulma';
import { graphql, compose } from 'react-apollo';
import Content from './content';
import Comment from './comment';
import Header from './header';
import About from './about';
import Layout from '../../Layout';
import style from '../style';
import withData from '../../../../apollo/withData';
import GraphQL from '../../../GraphQL';
import helper from '../../Home/helper';

// const Wysiwyg = dynamic(import('../../Wysiwyg'));

const QUERY_GET_ANSWER = GraphQL.QUERY_GET_ANSWER([
  'id',
  'content',
  'upvotes',
  'author { id, lastname, firstname }',
  'question { id, content, followers, answers }',
  'created_at',
  'views',
  'active'
]);

const MUTATION_DELETE_ANSWER = GraphQL.MUTATION_DELETE_ANSWER();

class AnswerFull extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tooltip: false,
      deleted: false
    };
    this.handleShare = this.handleShare.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.handleDeleteAnswer = this.handleDeleteAnswer.bind(this);
    this.deleteConfirm = this.deleteConfirm.bind(this);
  }

  componentWillMount() {
    if (this.props.answer.getAnswer) {
      this.setState({ deleted: !this.props.answer.getAnswer.active });
    }
  }

  componentDidMount() {
    helper(this.toggleTooltip);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.answer.getAnswer !== this.props.answer.getAnswer) {
      this.setState({ deleted: !nextProps.answer.getAnswer.active });
    }
  }

  //TODO: LOG ANSWER SHARING
  handleShare() {
  }

  toggleTooltip() {
    return this.setState({ tooltip: !this.state.tooltip });
  }

  deleteConfirm() {
    this.setState({ deleteModal: true });
  }

  async handleDeleteAnswer() {
    const id = this.props.query.answer;
    try {
      await this.props.deleteAnswer({
        variables: { id },
      });

      this.setState({ deleted: !this.state.deleted, deleteModal: false });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { answer } = this.props;
    const { deleted, deleteModal } = this.state;

    if (answer.getAnswer) {
      const twitterText = `
        My answer to ${answer.getAnswer.question.content}
        &url=${window.location.href}
      `;
      return (
        <Layout isAuth>
          <div style={style.answerFull.containerDiv}>
            <Column size="is5" style={style.answerFull.containerColumn}>
              <Header
                title={answer.getAnswer.question.content}
                createdAt={answer.getAnswer.created_at}
              />
              {deleted &&
                <Column>
                  <p className="answer-banner">
                    You deleted your answer to this question. You may <a>edit</a> and <a onClick={this.deleteAnswer}>restore your answer</a> at any time.
                  </p>
                </Column>
              }
              <Content
                tooltip={this.state.tooltip}
                toggleTooltip={this.toggleTooltip}
                handleShare={this.handleShare}
                context={answer.getAnswer.content}
                upvotes={answer.getAnswer.upvotes}
                views={answer.getAnswer.views}
                handleDelete={this.deleteConfirm}
                deleted={deleted}
                twitterText={twitterText}
              />
              <br />
              <Comment /><br />
              <Column className="link-col">
                <Link href={`/question/${this.props.query.question}`}>
                  <a style={style.answerFull.otherslink}>
                    View {answer.getAnswer.question.answers.length} Other Answers to this Question <i className="fa fa-chevron-right" />
                  </a>
                </Link>
              </Column>
              <About />
              <Column style={style.answerFull.lastCol}>
                <b>
                  <Button state="isDisabled">Followers | 1</Button>
                </b>
              </Column>
            </Column>
            <Modal
              type="card"
              headerContent={deleted ? 'Restore Answer' : 'Delete Answer'}
              footerContent={
                <div style={{ padding: '20px', textAlign: 'right', width: '100%' }} >
                  <a style={{ lineHeight: '1.8em', marginRight: 10 }} className="mute-link" onClick={() => this.setState({ deleteModal: false })}>Cancel</a>
                  <Button onClick={this.handleDeleteAnswer}>{deleted ? 'Restore Answer' : 'Delete'}</Button>
                </div>
              }
              isActive={deleteModal}
              onCloseRequest={() => this.setState({ deleteModal: false })}
            >
              <Column>
                {deleted ?
                  'Are you sure you wish to restore this answer?'
                  :
                  'Are you sure you wish to delete this answer? You can restore your answer at any time.'
                }
              </Column>
            </Modal>
          </div>
        </Layout>
      );
    }
    return (
      <div />
    );
  }
}

export default withData(compose(
  graphql(QUERY_GET_ANSWER, { name: 'answer', options: ({ query: { answer } }) => ({ variables: { id: answer } })}),
  graphql(MUTATION_DELETE_ANSWER, { name: 'deleteAnswer'})
)(AnswerFull));
