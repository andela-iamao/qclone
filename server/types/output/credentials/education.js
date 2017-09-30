const { GraphQLID, GraphQLString, GraphQLObjectType } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'GetEducation',
  fields: {
    id: {
      type: GraphQLID
    },
    school: {
      type: GraphQLString
    },
    concentration: {
      type: GraphQLString
    },
    secondary_concentration: {
      type: GraphQLString
    },
    degree_type: {
      type: GraphQLString
    },
    graduation_year: {
      type: GraphQLID
    }
  }
});
