const { GraphQLID, GraphQLString, GraphQLInputObjectType, GraphQLBoolean } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'Location',
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
