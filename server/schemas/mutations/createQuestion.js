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
  resolve: async (root, { data }) => {
    // const content = await data.content;
    const newQuestion = new Question(data);
    return newQuestion.save();
  }
};
