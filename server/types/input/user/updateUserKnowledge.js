
const { GraphQLInputObjectType, GraphQLString, GraphQLList, GraphQLBoolean } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'UpdateUserKnowledgeInput',
  fields: {
    topic_knowledge: {
      type: new GraphQLList(GraphQLString)
    },
    remove: {
      type: GraphQLBoolean
    }
  }
});
