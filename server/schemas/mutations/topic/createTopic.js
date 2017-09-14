const { GraphQLNonNull } = require('graphql');
const TopicType = require('../../../types/topic');
const CreateTopicInputType = require('../../../types/input/topic/createTopic');
const { Topic } = require('../../../db/schema');

module.exports = {
  type: TopicType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(CreateTopicInputType)
    }
  },
  resolve: (root, { data }) => {
    return new Promise((resolve, reject) => {
      const newTopic = new Topic(data);
      newTopic.save()
        .then((data) => resolve(data))
        .catch((errors) => reject(errors));
    });
  }
};
