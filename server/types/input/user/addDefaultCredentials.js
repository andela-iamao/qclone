const { GraphQLID, GraphQLString, GraphQLInputObjectType } = require('graphql');

const Employment = require('./addEmploymentCredentials');
const Education = require('./addEducationalCredentials');
const Location = require('./addLocationCredentials');

module.exports = new GraphQLInputObjectType({
  name: 'Default',
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
    }
  }
});
