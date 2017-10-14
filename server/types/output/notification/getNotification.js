const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql');

const User = require('../user/getUser');
const Answer = require('../answer/getAnswer');
const Question = require('../question/getQuestion');

module.exports = new GraphQLObjectType({
  name: 'Notifications',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    user: {
      type: User
    },
    owner: {
      type: GraphQLString
    },
    answer: {
      type: Answer
    },
    question: {
      type: Question
    },
    type: {
      type: GraphQLString
    },
    read: {
      type: GraphQLBoolean
    },
    created_at: {
      type: GraphQLString
    },
    updated_at: {
      type: GraphQLString
    }
  })
});
