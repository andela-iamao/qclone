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
  resolve: async (root, { data }, { _, db, user }) => {
    const answer = await db.Answer.findById(data.id);

    answer.upvote = _.union(answer.upvote, user.id);

    const notification = new db.Notification({
      owner: answer.id,
      user: user.id,
      type: 'upvote',
      answer: answer.id,
      question: answer.question
    });

    await notification.save();

    return answer.save();
  }
};
