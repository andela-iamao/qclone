
const { GraphQLID, GraphQLString, GraphQLInputObjectType, GraphQLBoolean } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'Employment',
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
