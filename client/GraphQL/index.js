import { gql } from 'react-apollo';

class GraphQL {
  static QUERY_ALL_TOPICS = (field) => gql`
    query {
      allTopics {
        ${field.join(',')}
      }
    }
  `;

  static QUERY_LOGGED_IN_USER = (output = ['id']) => gql`
    query {
      getLoggedInUser {
        ${output.join(',')}
      }
    }
  `;

  static MUTATION_UPDATE_USER_KNOWLEDGE = (output = ['id']) => gql`
    mutation UpdateUserKnowledgeInputType(
      $topic_knowledge: [String]
    ) {
      updateUserKnowledge(data: {
        topic_knowledge: $topic_knowledge
      }) {
        ${output.join(',')}
      }
    }
  `;

  static MUTATION_UPDATE_REGISTRATION_PROGRESS = (output = ['id']) => gql`
    mutation UpdateRegistrationProgressInput(
      $registeration_progress: ID
    ) {
      updateRegistrationProgress(data: {
        registeration_progress: $registeration_progress
      }) {
        ${output.join(',')}
      }
    }
  `;

  static MUTATION_CREATE_TOPIC = (output = ['id', 'title']) => gql`
    mutation CreateTopicInput($title: String, $image: String) {
      createTopic(data: { title: $title, image: $image }) { ${output.join(',')} }
    }
  `
}

export default GraphQL;
