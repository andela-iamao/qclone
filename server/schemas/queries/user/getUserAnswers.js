const { GraphQLList, GraphQLNonNull, GraphQLID } = require('graphql');
const EventType = require('../../../types/output/answer/answers');

module.exports = {
  type: new GraphQLList(EventType),
  resolve: async (root, args, { db, user }) => {
    const answers = await db.Answer.find({})
      .populate('topics')
      .populate('question')
      .populate('author')
      .exec();

    const AuthorsAnswers = answers.filter((ans) => ans.author.id === user.id);

    return AuthorsAnswers;
  }
};
