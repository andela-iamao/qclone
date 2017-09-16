const { GraphQLList } = require('graphql');
const EventType = require('../../../types/question');

module.exports = {
  type: new GraphQLList(EventType),
  resolve: async (root, args, { _, db, user }) => {
    const authUser = await db.User.findById(user.id);
    const result = await db.Question.find({})
      .exec();

    const interests = _.union(authUser.interests, authUser.topic_knowledge);

    const personalQ = [];
    result.forEach((question) => {
      if ((_.intersection(question.topics, interests).length > 0 ||
        question.author_id === user.id) &&
        authUser.passed_question.indexOf(question.id) === -1
      ) {
        personalQ.push(question);
      }
    });

    return personalQ;
  }
};
