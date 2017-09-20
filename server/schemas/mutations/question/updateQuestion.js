const { GraphQLNonNull } = require('graphql');
const QuestionType = require('../../../types/question');
const UpdateQuestionInputType = require('../../../types/input/question/updateQuestion');

module.exports = {
  type: QuestionType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(UpdateQuestionInputType)
    }
  },
  resolve: async (root, { data }, { _, db, stopword }) => {
    const question = await db.Question.findById(data.id);
    question.content = data.content;
    const result = {};
    data.topics = [];
    const cleanQuestion = data.content.toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ');
    const keywords = stopword.removeStopwords(cleanQuestion.split(' '));
    const allTopics = await db.Topic.find({}).select(['id', 'keywords']);
    allTopics.forEach((topic) => {
      let intersection = _.intersection(topic.keywords, keywords);
      if (intersection.length > 1) {
        result[topic.id] = intersection;
      }
    });

    question.topics = _.union(Object.keys(result), question.topics);
    return question.save();
  }
};
