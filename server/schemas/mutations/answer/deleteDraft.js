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
  resolve: async (root, { data }, { db, user, _ }) => {
    const answer = await db.Answer.findById(data.id);
    const authUser = await db.User.findById(user.id)
      .populate('location')
      .populate('education')
      .populate('employment')
      .exec();
    const question = await db.Question.findById(answer.question);
    question.answers = _.remove(question.answers, (n) => n !== answer.id);
    authUser.answer = _.remove(authUser.questions, (n) => n !== answer.id);
    await question.save();
    await authUser.save();
    return answer.remove();
  }
};
