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
  resolve: async (root, { data }, { db }) => {
    const question = await db.Question.findOneAndRemove(data.id);
    return question.save();
  }
};
