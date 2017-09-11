const { GraphQLList } = require('graphql');
const EventType = require('../../types/question');
const { Question } = require('../../db/schema');
const getProjection = require('../../utils/projection');

module.exports = {
  type: new GraphQLList(EventType),
  resolve: (root, args, options, fieldASTs) => {
    return new Promise((resolve, reject) => {
      const projection = getProjection(fieldASTs);
      Question.find({})
        .select(projection)
        .exec()
        .then((data) => resolve(data))
        .catch((errors) => reject(errors));
    });
  }
};
