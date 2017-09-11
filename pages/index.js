import { gql, graphql } from 'react-apollo';
import withData from '../apollo';

const query = gql`
  query {
    allQuestions {
      author
      id
      content
    }
  }
`;

class Index extends React.Component {
  render() {
    const { allQuestions } = this.props.data;
    return (
      <div>
        {allQuestions && allQuestions.map((question) => (
          <div key={question.id}>
            <h3>{question.content}</h3>
            <h5>{question.author}</h5>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

export default withData(graphql(query)(Index));
