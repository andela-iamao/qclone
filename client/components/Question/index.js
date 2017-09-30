import _ from 'lodash';
import Link from 'next/link';
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
  'id', 'author', 'content', 'followers', 'author_id',
  'topics { id, title }', 'views', 'created_at',
  'answers { id, content, author { id, lastname, firstname }, upvotes, created_at, views }'
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
    return (
      <Layout isAuth>
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
                          <Column style={{ paddingTop: 0 }}>
                            <Link href={`/question/${getQuestion.id}/answer/${answers[getUserId()].id}`}>
                              <a className="pseudo-link header-link underline-link-only">
                                <Subtitle>
                                  <span style={{ float: 'left' }}>
                                    <Icon icon="fa fa-file-o" size="isLarge" />
                                  </span>
                                  <span>
                                    <span className="header no-underline-hover">You've written an answer</span><br/>
                                    <span className="mute-link" style={{ fontSize: 13 }}>You can edit or delete it at any time.</span>
                                  </span>
                                  <span style={{ clear: 'both' }} />
                                </Subtitle>
                              </a>
                            </Link>
                          </Column>
                          <h3>{`${Object.keys(answers).length} ${Object.keys(answers).length > 1 ? 'Answers' : 'Answer'}`}</h3>
                          <hr />
                          <Column>
                            {Object.values(answers).map((answer) => (
                              <Column key={answer.id}>
                                <Columns>
                                  <Column size="is1">
                                    <img style={style.userAvatar} src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/07/28/16/avatar.jpg" />
                                  </Column>
                                  <Column style={style.userInfo}>
                                    <Column>
                                      <a href="#" className="header-link">{`${answer.author.firstname} ${answer.author.lastname}`}</a><br />
                                      <a href="#" className="mute-link">Edit credentials</a>
                                    </Column>
                                  </Column>
                                </Columns>
                                <Column>
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
