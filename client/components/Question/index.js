import _ from 'lodash';
import { Tag, Column, Tile, Subtitle, Icon } from 're-bulma';
import { graphql, compose } from 'react-apollo';
import Sidebar from './Sidebar';
import Layout from '../Layout';
import Action from '../QuestionCard/Action';
import withData from '../../../apollo/withData';
import GraphQL from '../../GraphQL';
import style from './style';

const QUERY_GET_QUESTION = GraphQL.QUERY_GET_QUESTION(
  ['id', 'author', 'content', 'followers', 'author_id', 'topics { id, title }', 'views', 'created_at']
);

class Question extends React.Component {

  static propTypes = {

  };

  constructor(props) {
    super(props);

    this.state = { };

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
    return (
      <Layout isAuth>
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
                    <h2>{getQuestion.content}</h2>
                    <div>
                      <Action noAnswer {...getQuestion} noPass />
                    </div>
                    <hr />
                  </Column>
                  <Column style={style.noAnswer}>
                    <Subtitle>
                      <Icon icon="fa fa-pencil" size="isLarge" />
                    </Subtitle>
                    <h3>No Answer Yet</h3>
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
      </Layout>
    );
  }
}

export default withData(compose(
  graphql(QUERY_GET_QUESTION, { name: 'getQuestion', options: ({ id }) => ({ variables: { id } }) })
)(Question));
