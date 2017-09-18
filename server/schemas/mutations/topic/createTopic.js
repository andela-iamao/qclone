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
  resolve: (root, { data }, { _, stopword }) => {
    return new Promise((resolve, reject) => {
      const newTopic = new Topic(data);
      let keywords = _.union(
        newTopic.keywords,
        stopword.removeStopwords(newTopic.title.toLowerCase().split(' '))
      );
      if (newTopic.description) {
        keywords = _.union(keywords, stopword.removeStopwords(newTopic.description.toLowerCase().split(' ')));
      }
      newTopic.keywords = keywords;
      newTopic.save()
        .then((data) => resolve(data))
        .catch((errors) => reject(errors));
    });
  }
};
