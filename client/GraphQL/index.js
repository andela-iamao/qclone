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

  static QUERY_GET_USER = (output = ['id']) => gql`
    query User($id: ID!) {
      getUser(id: $id) {
        ${output.join(',')}
      }
    }
  `;

  static QUERY_PERSONAL_QUESTIONS = (output = ['id', 'content', 'author']) => gql`
    query {
      getPersonalQuestions {
        ${output.join(',')}
      }
    }
  `;

  static QUERY_GET_QUESTION = (output = ['id', 'content', 'author']) => gql`
    query QuestionInputType($id: ID!){
      getQuestion(id: $id){ ${output.join(',') } } }
  `;

  static MUTATION_UPDATE_USER_KNOWLEDGE = (output = ['id']) => gql`
    mutation UpdateUserKnowledgeInputType(
      $topic_knowledge: [String], $remove: Boolean
    ) {
      updateUserKnowledge(data: {
        topic_knowledge: $topic_knowledge,
        remove: $remove
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

  static MUTATION_CREATE_ANSWER = (output = ['id', 'content', 'author']) => gql`
    mutation CreateAnswerInput($content: String, $question: ID, $draft: Boolean) {
      createAnswer(data: {
        question: $question,
        content: $content,
        draft: $draft
      }) { ${output.join(',')}}
    }
  `;

  static MUTATION_UPDATE_ANSWER = (output = ['id', 'content', 'author']) => gql`
    mutation CreateAnswerInput($content: String, $id: ID, $draft: Boolean) {
       updateAnswer(data: {
        id: $id,
        content: $content,
        draft: $draft
      }) { ${output.join(',')}}
    }
  `;

  static MUTATION_DELETE_ANSWER = (output = ['id']) => gql`
    mutation DeleteAnswerInput($id: ID) {
       deleteAnswer(data: {
        id: $id
      }) { ${output.join(',')}}
    }
  `;

  static QUERY_GET_ANSWER = (output = ['id', 'content', 'author']) => gql `
    query AnswerInputType($id: ID!) {
      getAnswer(id: $id){ ${output.join(',') } } }
  `;
  static QUERY_GET_USER_ANSWERS = (output = ['id']) => gql`
    query {
      getUserAnswers {${output.join(',')}}
    }
  `;

  static MUTATION_UPLOAD_AVATAR = (output = ['id']) => gql`
    mutation updateUserAvatar($avatar: UploadInputType, $remove: Boolean) {
      updateUserAvatar(data: {
        avatar: $avatar,
        remove: $remove
      }) {
        ${output.join(',')}
      }
    }
  `;

  static MUTATION_UPDATE_USER = (output = ['id']) => gql`
    mutation UpdateUser(
      $profileCredential: String,
      $description: String
    ) {
      updateUser (data: {
        profile_credential: $profileCredential,
        description: $description
      }) {
        ${output.join(',')}
      }
    }
  `;

  static MUTATION_ADD_CREDENTIALS = (output = ['id']) => gql`
    mutation AddCredential(
      $id: ID,
      $credential: String,
      $employment: Employment,
      $education: Education,
      $location: Location
    ) {
      addCredentials(data: {
        credential: $credential,
        id: $id,
        employment: $employment,
        education: $education
        location: $location
      }) { ${output.join(',')} }
    }
  `;

  static MUTATION_ADD_DEFAULT_CREDENTIALS = (output = ['id']) => gql`
    mutation AddDefaultCredential(
      $default: DefaultCredential
    ) {
      setDefaultCredentials(data: {
        default: $default,
      }) { ${output.join(',')} }
    }
  `;

}

export default GraphQL;
