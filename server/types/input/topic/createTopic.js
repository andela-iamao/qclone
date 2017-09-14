const { GraphQLInputObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'CreateTopicInput',
  fields: {
    title: {
      type: GraphQLString
    },
    image: {
      type: GraphQLString
    }
  }
});
