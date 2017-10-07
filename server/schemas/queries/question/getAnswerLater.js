const { GraphQLList } = require('graphql');
const EventType = require('../../../types/output/question/answerLater');

module.exports = {
  type: new GraphQLList(EventType),
  resolve: async (root, args, { db, user }) => {
    return db.AnswerLater.find({ owner: user.id });
  }
};
