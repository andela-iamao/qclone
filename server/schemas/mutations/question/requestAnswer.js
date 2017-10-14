const { GraphQLNonNull, GraphQLList } = require('graphql');
const RequestAnswerInputType = require('../../../types/input/question/requestAnswer');
const RequestAnswerType = require('../../../types/output/question/requestAnswer');

module.exports = {
  type: new GraphQLList(RequestAnswerType),
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(RequestAnswerInputType)
    }
  },
  resolve: async (root, { data }, { db, user }) => {
    const existingAnswerReq = db.AnswerRequest.find({
      target: data.userId,
      question: data.questionId,
      by: user.id
    });
    if (!existingAnswerReq) {
      const answerReq = new db.AnswerRequest({
        target: data.userId,
        question: data.questionId,
        by: user.id
      });

      const notification = new db.Notification({
        owner: data.userId,
        user: user.id,
        type: 'requests',
        question: data.questionId
      });

      await notification.save();

      return answerReq.save();
    }
    return existingAnswerReq;
  }
};
