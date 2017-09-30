const { GraphQLNonNull } = require('graphql');
const QuestionType = require('../../../types/question');
const DeleteQuestionInputType = require('../../../types/input/question/deleteQuestion');

module.exports = {
  type: QuestionType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(DeleteQuestionInputType)
    }
  },
  resolve: async (root, { data }, { db, user, _ }) => {
    const question = await db.Question.findOneAndRemove(data.id);
    const authUser = db.User.findById(user.id);
    authUser.questions = _.remove(authUser.questions, (n) => n !== question.id);
    authUser.save();
    return question.save();
  }
};
