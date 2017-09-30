const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');

const Employment = require('../credentials/employment');
const Education = require('../credentials/education');
const Location = require('../credentials/location');
const Question = require('../question/getQuestion');
const Answer = require('../answer/getAnswer');
const Topic = require('../../topic');
const Followers = require('./followers');
const Following = require('./following');



module.exports = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    firstname: {
      type: GraphQLString
    },
    lastname: {
      type: GraphQLString
    },
    employment: {
      type: new GraphQLList(Employment)
    },
    education: {
      type: new GraphQLList(Education)
    },
    location: {
      type: new GraphQLList(Location)
    },
    email: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    passed_question: {
      type: new GraphQLList(GraphQLID)
    },
    followers: {
      type: new GraphQLList(Followers)
    },
    following: {
      type: new GraphQLList(Following)
    },
    questions: {
      type: new GraphQLList(Question)
    },
    answers: {
      type: new GraphQLList(Answer)
    },
    profile_photo: {
      type: GraphQLString
    },
    profile_credential: {
      type: GraphQLString
    },
    register_progress: {
      type: GraphQLID
    },
    topic_knowledge: {
      type: new GraphQLList(Topic)
    },
    interests: {
      type: new GraphQLList(Topic)
    },
    created_at: {
      type: GraphQLString
    },
    updated_at: {
      type: GraphQLString
    }
  })
});
