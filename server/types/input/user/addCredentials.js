const { GraphQLID, GraphQLString, GraphQLInputObjectType } = require('graphql');

const Employment = require('./addEmploymentCredentials');
const Education = require('./addEducationalCredentials');
const Default = require('./addDefaultCredentials');
const Location = require('./addLocationCredentials');

module.exports = new GraphQLInputObjectType({
  name: 'AddCredential',
  fields: {
    id: {
      type: GraphQLID
    },
    credential: {
      type: GraphQLString
    },
    employment: {
      type: Employment
    },
    education: {
      type: Education
    },
    location: {
      type: Location
    },
    default: {
      type: Default
    }
  }
});
