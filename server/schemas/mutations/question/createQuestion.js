const { GraphQLNonNull } = require('graphql');
const QuestionType = require('../../../types/question');
const RegisterUserInputType = require('../../../types/input/question');
const { Topic, Question } = require('../../../db/schema');

module.exports = {
  type: QuestionType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(RegisterUserInputType)
    }
  },
  resolve: async (root, { data }, { _, db, stopword, user }) => {
    const result = {};
    data.topics = [];
    const cleanQuestion = data.content.toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ');
    const keywords = stopword.removeStopwords(cleanQuestion.split(' '));
    const allTopics = await Topic.find({}).select(['id', 'keywords']);
    allTopics.forEach((topic) => {
      let intersection = _.intersection(topic.keywords, keywords);
      if (intersection.length > 1) {
        result[topic.id] = intersection;
      }
    });

    Object.keys(result).forEach((key) => {
      data.topics.push(key);
    });

    data.content = data.content[data.content.length - 1] !== '?' ? `${data.content}?` : data.content;

    const question = new Question(data);
    question.author_id = user.id;
    const save = await question.save();
    const authUser = await db.User.findById(user.id)
      .populate('employment')
      .populate('education')
      .populate('location')
      .populate('topic_knowledge')
      .populate('answers')
      .populate('questions')
      .populate('followers')
      .populate('following')
      .exec();
    authUser.questions = _.union(authUser.questions.map((q) => q.id), [save.id]);
    await authUser.save();
    return save;
  }
};
