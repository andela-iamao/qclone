const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');


module.exports = new GraphQLObjectType({
  name: 'Following',
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
      type: new GraphQLList(GraphQLString)
    },
    education: {
      type: new GraphQLList(GraphQLString)
    },
    location: {
      type: new GraphQLList(GraphQLString)
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
      type: new GraphQLList(GraphQLString)
    },
    following: {
      type: new GraphQLList(GraphQLString)
    },
    questions: {
      type: new GraphQLList(GraphQLString)
    },
    answers_by: {
      type: new GraphQLList(GraphQLString)
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
      type: new GraphQLList(GraphQLString)
    },
    interests: {
      type: new GraphQLList(GraphQLString)
    },
    created_at: {
      type: GraphQLString
    },
    updated_at: {
      type: GraphQLString
    }
  })
});
