
const { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLBoolean } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'GetEmployment',
  fields: {
    id: {
      type: GraphQLID
    },
    start: {
      type: GraphQLID
    },
    end: {
      type: GraphQLID
    },
    position: {
      type: GraphQLString
    },
    company: {
      type: GraphQLString
    },
    active: {
      type: GraphQLBoolean
    }
  }
});
