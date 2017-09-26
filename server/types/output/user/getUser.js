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
    profile_photo: {
      type: GraphQLString
    },
    profile_credential: {
      type: GraphQLString
    },
    register_progress: {
      type: GraphQLID
    },
    created_at: {
      type: GraphQLString
    },
    updated_at: {
      type: GraphQLString
    }
  })
});
