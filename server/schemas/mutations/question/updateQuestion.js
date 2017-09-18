const { GraphQLNonNull } = require('graphql');
const QuestionType = require('../../../types/question');
const UpdateQuestionInputType = require('../../../types/input/question/updateQuestion');

module.exports = {
  type: QuestionType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(UpdateQuestionInputType)
    }
  },
  resolve: async (root, { data }, { db }) => {
    const question = await db.Question.findById(data.id);
    question.content = data.content;
    return question.save();
  }
};
