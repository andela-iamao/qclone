const { GraphQLInputObjectType, GraphQLID } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'TweetQuestionInput',
  fields: {
    id: {
      type: GraphQLID
    }
  }
});
