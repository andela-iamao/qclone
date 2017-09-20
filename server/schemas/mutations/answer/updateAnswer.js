const { GraphQLNonNull } = require('graphql');
const AnswerType = require('../../../types/output/answer/createAnswer');
const AnswerInputType = require('../../../types/input/answer/updateAnswer');

module.exports = {
  type: AnswerType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(AnswerInputType)
    }
  },
  resolve: async (root, { data }, { db }) => {
    const answer = await db.Answer.findById(data.id);

    answer.content = data.content;
    answer.draft = data.draft;
    answer.updated_at = Date.now();

    return answer.save();
  }
};
