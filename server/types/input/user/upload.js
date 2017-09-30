const { GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLInt } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'UploadInputType',
  fields: {
    lastModified: { type: GraphQLID },
    lastModifiedDate: { type: GraphQLString },
    name: { type: GraphQLString },
    preview: { type: GraphQLString },
    size: { type: GraphQLInt},
    type: { type: GraphQLString},
    path: { type: GraphQLString},
    webkitRelativePath: { type: GraphQLString }
  }
});
