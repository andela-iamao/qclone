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

  static QUERY_PERSONAL_QUESTIONS = (output = ['id', 'content', 'author']) => gql `
    query {
      getPersonalQuestions {
        ${output.join(',')}
      }
    }
  `;

  static QUERY_GET_QUESTION = (output = ['id', 'content', 'author']) => gql `
    query QuestionInputType($id: ID!){
      getQuestion(id: $id){ ${output.join(',') } } }
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
      }) { ${output.join(',') } }
    }
  `;

  static MUTATION_CREATE_TOPIC = (output = ['id', 'title']) => gql`
    mutation CreateTopicInput($title: String, $image: String) {
      createTopic(data: { title: $title, image: $image }) { ${output.join(',')} }
    }
  `;

  static MUTATION_CREATE_QUESTION = (output = ['id', 'content', 'author']) => gql`
    mutation CreateQuestionInput($content: String, $author: String){
      createQuestion(data:{
        content:$content,
        author:$author
      }) { ${output.join(',') }}
    }
  `;

  static MUTATION_UPDATE_QUESTION = (output = ['id', 'content', 'author']) => gql`
    mutation CreateQuestionInput($id:ID, $content: String){
      updateQuestion(data:{
        id: $id,
        content:$content
      }) { ${output.join(',') }}
    }
  `;

  static MUTATION_FOLLOW_QUESTION = (output = ['id', 'content', 'author']) => gql`
    mutation FollowQuestionInput($id: ID) {
      followQuestion(data: {
        id: $id,
      }) { ${output.join(',') }}
    }
  `;

  static MUTATION_PASS_QUESTION = (output = ['id', 'passed_question']) => gql`
    mutation PassQuestionInput($id: ID) {
      passQuestion(data: {
        id: $id,
      }) { ${output.join(',') }}
    }
  `;

  static MUTATION_SHARE_QUESTION = (output = ['id']) => gql`
    mutation TweetQuestionInput($id: ID, $social: String) {
      shareQuestion(data: {
        id: $id,
        social: $social
      }) { ${output.join(',') }}
    }
  `;
}

export default GraphQL;
