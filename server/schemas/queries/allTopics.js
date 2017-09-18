const { GraphQLList } = require('graphql');
const EventType = require('../../types/topic');
const { Topic } = require('../../db/schema');
const getProjection = require('../../utils/projection');

module.exports = {
  type: new GraphQLList(EventType),
  resolve: (root, args, _ , fieldASTs) => {
    return new Promise((resolve, reject) => {
      const projection = getProjection(fieldASTs);
      Topic.find({})
        .select(projection)
        .exec()
        .then((data) => resolve(data))
        .catch((errors) => reject(errors));
    });
  }
};
