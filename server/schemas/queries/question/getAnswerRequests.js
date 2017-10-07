const { GraphQLID, GraphQLList } = require('graphql');
const EventType = require('../../../types/output/question/requestAnswer');

module.exports = {
  type: new GraphQLList(EventType),
  args: {
    target: {
      name: 'target',
      type: GraphQLID
    },
    by: {
      name: 'by',
      type: GraphQLID
    },
    question: {
      name: 'question',
      type: GraphQLID
    }
  },
  resolve: async (root, { target, by, question }, { db, user }) => {
    if (target && target === '1') {
      return db.AnswerRequest.find({ target: user.id });
    } else if (by) {
      return db.AnswerRequest.find({ by });
    } else if (question) {
      return db.AnswerRequest.find({ question });
    }
    return {};
  }
};
