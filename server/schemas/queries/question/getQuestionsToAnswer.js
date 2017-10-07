const { GraphQLList } = require('graphql');
const EventType = require('../../../types/question');

module.exports = {
  type: new GraphQLList(EventType),
  resolve: async (root, args, { _, db, user }) => {
    const authUser = await db.User.findById(user.id);
    const result = await db.Question.find({})
      .populate('answers_by')
      .populate('topics')
      .populate({
        path: 'answers',
        populate: { path: 'author' }
      })
      .limit(500)
      .exec();

    const interests = _.union(authUser.interests, authUser.topic_knowledge);


    const personalQ = [];
    result.forEach((question) => {
      const allAuthors = question.answers
        .filter((ans) => !ans.draft)
        .map((ans) => ans.author.id);
      if (_.intersection(question.topics.map((topic) => topic.id), interests).length > 0 &&
        authUser.passed_question.indexOf(question.id) === -1 &&
        allAuthors.indexOf(user.id) === -1
      ) {
        question.ownAnswer = [...question.answers].reduce((a, b) => {
          if (b.author.id === user.id) {
            a = b;
            return a;
          }
        }, {});
        question.topicsInfo = [...question.topics];
        question.answers = question.answers.filter((ans) => ans.author.id !== user.id && (!ans.draft || !ans.active));
        personalQ.push(question);
      }
    });

    return personalQ;
  }
};
