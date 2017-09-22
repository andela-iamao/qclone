const { GraphQLInputObjectType, GraphQLBoolean } = require('graphql');

const Upload = require('./upload');

module.exports = new GraphQLInputObjectType({
  name: 'UpdateAvatarInputType',
  fields: {
    avatar: {
      type: Upload
    },
    remove: {
      type: GraphQLBoolean
    }
  }
});
