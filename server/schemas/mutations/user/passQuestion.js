const { GraphQLNonNull } = require('graphql');
const UserType = require('../../../types/user');
const PassQuestionInputType = require('../../../types/input/user/passQuestion');

module.exports = {
  type: UserType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(PassQuestionInputType)
    }
  },
  resolve: async (root, { data }, { _, user, db }) => {
    const currentUser = await db.User.findById(user.id)
      .populate('employment')
      .populate('education')
      .populate('location')
      .populate('topic_knowledge')
      .exec();
    if (currentUser.passed_question.indexOf(data.id) > -1) {
      currentUser.passed_question =  _.remove(currentUser.passed_question, (q) => q !== data.id);
    } else {
      currentUser.passed_question = _.union(currentUser.passed_question, [data.id]);
    }
    return currentUser.save();
    // return db.User.findById(user.id)
  }
};
