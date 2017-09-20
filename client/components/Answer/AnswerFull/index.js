// import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button, Column } from 're-bulma';
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
  'views'
]);

class AnswerFull extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tooltip: false
    };
    this.handleShare = this.handleShare.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
  }
  componentDidMount() {
    helper(this.toggleTooltip);
  }
  handleShare() {
  }

  toggleTooltip() {
    return this.setState({ tooltip: !this.state.tooltip });
  }

  render() {
    const { answer } = this.props;
    if (answer.getAnswer) {
      return (
        <Layout isAuth>
          <div style={style.answerFull.containerDiv}>
            <Column size="is5" style={style.answerFull.containerColumn}>
              <Header
                title={answer.getAnswer.question.content}
                createdAt={answer.getAnswer.created_at}
              />
              <Content
                tooltip={this.state.tooltip}
                toggleTooltip={this.toggleTooltip}
                handleShare={this.handleShare}
                context={answer.getAnswer.content}
                upvotes={answer.getAnswer.upvotes}
                views={answer.getAnswer.views}
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
  graphql(QUERY_GET_ANSWER, { name: 'answer', options: ({ query: { answer } }) => ({ variables: { id: answer } })})
)(AnswerFull));

// export default AnswerFull;
