import Link from 'next/link';
import moment from 'moment';
import { Tag, Column, Columns, Tile, Subtitle, Icon } from 're-bulma';
import { graphql, compose } from 'react-apollo';
import Sidebar from './Sidebar';
import Layout from '../Layout';
import Action from '../QuestionCard/Action';
import withData from '../../../apollo/withData';
import GraphQL from '../../GraphQL';
import style from './style';
import { getUserId } from '../../util/auth';

const QUERY_GET_QUESTION = GraphQL.QUERY_GET_QUESTION([
  'id', 'author', 'content', 'followers', 'author_id', 'views', 'created_at', 'topics { id, title }',
  'author_details { id, lastname, firstname, profile_photo, profile_credential }',
  'answers { id, content, author { id, lastname, firstname, profile_photo, profile_credential }, upvotes, created_at, views }'
]);

class Question extends React.Component {

  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = { answers: {} };

  }

  componentWillMount(){
    if (this.props.getQuestion.getQuestion) {
      this.setState((prevState) => {
        const newState = {...prevState};
        newState.answers = this.props.getQuestion.getQuestion.answers.reduce((a, b) => {
          a[b.author.id] = b;
          return a;
        }, {});
        return newState;
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getQuestion.getQuestion !== this.props.getQuestion.getQuestion) {
      this.setState((prevState) => {
        const newState = {...prevState};
        newState.answers = nextProps.getQuestion.getQuestion.answers.reduce((a, b) => {
          a[b.author.id] = b;
          return a;
        }, {});
        return newState;
      });
    }
  }

  async shareQuestion(id, social) {
    try {
      const result = await this.props.shareQuestion({ variables: { id, social } });
      console.info(result);
    } catch(error) {
      console.info(error);
    }
  }

  async handleUpdateQuestion() {
    const { question: content, isEditing: id } = this.state;
    this.setState({ askingQuestion: true });
    try {
      const result = await this.props.updateQuestion({
        variables: {
          id,
          content
        }
      });
      this.setState({ askingQuestion: false, question: '' });
      this.toggleQuestionModal();
      console.info(result);
    } catch(error) {
      console.info(error);
    }
  }

  render() {
    const { getQuestion: { getQuestion } } = this.props;
    const { answers } = this.state;
    if (!getQuestion) {
      return <div />;
    }
    return (
      <Layout isAuth user={getQuestion.author_details}>
        <div style={{ maxHeight: '99vh', overflowY: 'scroll' }}>
          <Column size="is8" style={style.container}>
            {getQuestion &&
              <Tile context="isAncestor" style={style.container}>
                <Tile size="is8">
                  <Column size="is12">
                    <Column>{getQuestion.topics.map((topic) => (
                      <Tag key={topic.id}>{topic.title}</Tag>
                    ))}
                    </Column>
                    <Column>
                      <h1>{getQuestion.content}</h1>
                      <div>
                        <Action noAnswer {...getQuestion} noPass removeAnswer={!!answers[getUserId()]} />
                      </div>
                      {answers[getUserId()] && <hr />}
                    </Column>
                    <Column>
                      {Object.keys(answers).length > 0 ?
                        <Column style={{ paddingTop: 0 }}>
                          {answers[getUserId()] &&
                            <Column style={{ paddingTop: 0 }}>
                              <Link as={`/question/${getQuestion.id}/answer/${answers[getUserId()].id}`} href={`/question/answer?questionId=${getQuestion.id}&answerId=${answers[getUserId()].id}`}>
                                <a className="pseudo-link header-link underline-link-only">
                                  <Subtitle>
                                    <span style={{ float: 'left', marginRight: 10 }}>
                                      <img src="//qsf.ec.quoracdn.net/-3-images.question_prompt.answer_written.svg-26-3553b9eb9b81a338.svg" width={25} />
                                    </span>
                                    <span style={{ float: 'left', marginRight: 10 }}>
                                      <span className="header no-underline-hover">{'You\'ve'} written an answer</span><br/>
                                      <span className="mute-link" style={{ fontSize: 13 }}>You can edit or delete it at any time.</span>
                                    </span>
                                    <span style={{ float: 'right', marginRight: 10 }}>
                                      <Icon icon="fa fa-angle-right" size="isLarge" />
                                    </span>
                                    <span style={{ clear: 'both' }} /><br /><br />
                                  </Subtitle>
                                </a>
                              </Link>
                            </Column>
                          }
                          <h3>{`${Object.keys(answers).length} ${Object.keys(answers).length > 1 ? 'Answers' : 'Answer'}`}</h3>
                          <hr />
                          <Column>
                            {Object.values(answers).map((answer) => (
                              <Column key={answer.id}>
                                <Columns style={{ marginBottom: 0, paddingBottom: 0 }}>
                                  <Column size="is1" style={{ marginTop: 0, paddingTop: 0 }}>
                                    <img style={style.userAvatar} src={answer.author.profile_photo} />
                                  </Column>
                                  <Column style={style.userInfo}>
                                    <span>
                                      <Link href={`/profile/${answer.author.id}`}>
                                        <a href="#" className="header-link">{`${answer.author.firstname} ${answer.author.lastname}`}</a>
                                      </Link>
                                      <span>, {answer.author.profile_credential}</span>
                                    </span><br />
                                    <a href="#" className="mute-link">Answered {moment(answer.created_at).fromNow()}</a>
                                  </Column>
                                  {answer.author.id !== getUserId() &&
                                    <Column style={{ position: 'relative' }}>
                                      <a
                                        className="User UserFollowHeaderIcon TwoStateButton UserFollowHeaderIconNoBorder Button UserFollowHeader main_button user_follow_button user_follow_button_icon follow_button" href="#">
                                        <span className="button_text"></span>
                                      </a>
                                    </Column>
                                  }
                                </Columns>
                                <Column style={{ marginTop: 0, paddingTop: 0 }}>
                                  <p className="answer-content" style={style.content} dangerouslySetInnerHTML={{ __html : answer.content }} />
                                </Column>
                              </Column>
                            ))}
                          </Column>
                        </Column>
                        :
                        <Column style={style.noAnswer}>
                          <Subtitle>
                            <Icon icon="fa fa-pencil" size="isLarge" />
                          </Subtitle>
                          <h3>No Answer Yet</h3>
                        </Column>
                      }
                    </Column>
                  </Column>
                </Tile>
                <Tile context="isParent">
                  <Tile context="isChild" style={style}>
                    <Sidebar {...getQuestion} />
                  </Tile>
                </Tile>
              </Tile>
            }
          </Column>
        </div>
      </Layout>
    );
  }
}

export default withData(compose(
  graphql(QUERY_GET_QUESTION, { name: 'getQuestion', options: ({ id }) => ({ variables: { id } }) })
)(Question));
