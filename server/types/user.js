const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');

const Topic = require('./topic');

module.exports = new GraphQLObjectType({
  name: 'RegisterUser',
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
    email: {
      type: GraphQLString
    },
    passed_question: {
      type: new GraphQLList(GraphQLID)
    },
    topic_knowledge: {
      type: new GraphQLList(Topic)
    },
    register_progress: {
      type: GraphQLID
    },
    profile_photo: {
      type: GraphQLString
    },
    profile_credential: {
      type: GraphQLString
    },
    created_at: {
      type: GraphQLString
    },
    updated_at: {
      type: GraphQLString
    }
  })
});
