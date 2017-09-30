
const { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLBoolean } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'GetLocation',
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
    location: {
      type: GraphQLString
    },
    active: {
      type: GraphQLBoolean
    }
  }
});
