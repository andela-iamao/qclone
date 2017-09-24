const { GraphQLList, GraphQLID } = require('graphql');
const EventType = require('../../../types/question');

module.exports = {
  type: new GraphQLList(EventType),
  args: {
    id: {
      name: 'id',
      type: new GraphQLList(GraphQLID)
    }
  },
  resolve: async (root, { data }, { _, db, user }) => {
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


    const relatedQ = [];
    result.forEach((question) => {
      const allAuthors = question.answers
        .filter((ans) => !ans.draft)
        .map((ans) => ans.author.id);
      if ((_.intersection(question.topics, interests).length > 0 ||
        question.author_id === user.id) &&
        authUser.passed_question.indexOf(question.id) === -1 &&
        allAuthors.indexOf(user.id) === -1
      ) {
        question.ownAnswer = [...question.answers].reduce((a, b) => {
          if (b.author.id === user.id) {
            a = b;
            return a;
          }
        }, {});
        question.answers = question.answers.filter((q) => q.author.id !== user.id && (!q.draft || !q.active));
        if (_.intersection(question.topics, data.topics).length > 2) {
          relatedQ.push(question);
        }
      }
    });

    return relatedQ;
  }
};
