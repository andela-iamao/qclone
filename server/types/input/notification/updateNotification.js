const { GraphQLID, GraphQLBoolean, GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'UpdateNotification',
  fields: {
    id: {
      type: GraphQLID
    },
    read: {
      type: GraphQLBoolean
    },
    user: {
      type: GraphQLID
    }
  }
});
