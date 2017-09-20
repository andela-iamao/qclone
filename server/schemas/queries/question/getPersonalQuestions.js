const { GraphQLList } = require('graphql');
const EventType = require('../../../types/question');

module.exports = {
  type: new GraphQLList(EventType),
  resolve: async (root, args, { _, db, user }) => {
    const authUser = await db.User.findById(user.id);
    const result = await db.Question.find({})
      .populate('answers_by')
      .populate({
        path: 'answers',
        populate: { path: 'author' }
      })
      .limit(500)
      .exec();

    const interests = _.union(authUser.interests, authUser.topic_knowledge);

    const personalQ = [];
    result.forEach((question) => {
      if ((_.intersection(question.topics, interests).length > 0 ||
        question.author_id === user.id) &&
        authUser.passed_question.indexOf(question.id) === -1
      ) {
        question.ownAnswer = [...question.answers].reduce((a, b) => {
          if (b.author.id === user.id) {
            a = b;
            return a;
          }
        }, {});
        question.answers = question.answers.filter((q) => !q.draft);
        personalQ.push(question);
      }
    });

    return personalQ;
  }
};
