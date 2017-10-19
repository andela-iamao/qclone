import GraphQL from '../../GraphQL';

const userList = [
  'id',
  'firstname',
  'lastname',
  'profile_photo',
  'profile_credential',
  'description',
  'employment { id, position, company, start, end }',
  'education { id, school, concentration, secondary_concentration, degree_type, graduation_year }',
  'location { id, start, end, location, active }',
  'topic_knowledge { id, title, image }',
  'interests { id, title, image }',
  'questions { id, author, content, followers }',
  'answers { id, content, question { id, content }, upvotes, created_at, views }',
  'followers { id, firstname, lastname }',
  'following { id, firstname, lastname }'
];

export default {
  QUERY_GET_USER: GraphQL.QUERY_GET_USER(userList)
};