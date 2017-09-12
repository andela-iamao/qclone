const { GraphQLNonNull } = require('graphql');
const EventType = require('../../types/question');
const EventInputType = require('../../types/input/question');
const { Question } = require('../../db/schema');

module.exports = {
  type: EventType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(EventInputType)
    }
  },
  resolve: (root, { data }) => {
    return new Promise((resolve, reject) => {
      const newQuestion = new Question(data);
      newQuestion.save()
        .then((data) => resolve(data))
        .catch((errors) => reject(errors));
    });
  }
};
