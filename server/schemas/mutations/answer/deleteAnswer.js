
const { GraphQLNonNull } = require('graphql');
const AnswerType = require('../../../types/output/answer/createAnswer');
const DeleteAnswerInputType = require('../../../types/input/answer/deleteAnswer');

module.exports = {
  type: AnswerType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(DeleteAnswerInputType)
    }
  },
  resolve: async (root, { data }, { db }) => {
    const answer = await db.Answer.findById(data.id);
    answer.active = !answer.active;
    return answer.save();
  }
};
