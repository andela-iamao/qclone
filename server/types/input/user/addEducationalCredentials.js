const { GraphQLID, GraphQLString, GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'Education',
  fields: {
    id: {
      type: GraphQLID
    },
    graduation_year: {
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
    }
  }
});
