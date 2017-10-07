const { GraphQLList } = require('graphql');
const EventType = require('../../../types/question');

module.exports = {
  type: new GraphQLList(EventType),
  resolve: async (root, args, { db, user }) => {
    const answers = await db.Answer.find({ draft: true, author: user.id, active: true });
    const question = await db.Question.find({ _id : { $in : answers.map((a) => a.question) } })
      .populate('answers_by')
      .populate('topics')
      .populate({
        path: 'answers',
        populate: { path: 'author' }
      })
      .limit(500)
      .exec();
    return question.map((q) => {
      q.topicsInfo = [...q.topics];
      q.ownAnswer = [...q.answers].reduce((a, b) => {
        if (b.author.id === user.id) {
          a = b;
          return a;
        }
      }, {});
      return q;
    });
  }
};
