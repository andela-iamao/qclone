const { GraphQLNonNull, GraphQLList } = require('graphql');
const AnswerLaterInputType = require('../../../types/input/question/requestAnswer');
const AnswerLaterType = require('../../../types/output/question/requestAnswer');

module.exports = {
  type: new GraphQLList(AnswerLaterType),
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(AnswerLaterInputType)
    }
  },
  resolve: async (root, { data }, { db, user }) => {
    const existingAnswerLater = db.AnswerLater.find({
      user: user.id,
      question: data.questionId,
    });
    if (!existingAnswerLater) {
      const answerLater = new db.AnswerLater({
        user: user.id,
        question: data.questionId,
      });
      return answerLater.save();
    }
    return existingAnswerLater;
  }
};
