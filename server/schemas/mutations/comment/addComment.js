const { GraphQLNonNull } = require('graphql');
const AnswerType = require('../../../types/output/answer/createAnswer');
const CommentInputType = require('../../../types/input/comment/createComment');

module.exports = {
  type: AnswerType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(CommentInputType)
    }
  },
  resolve: async (root, { data }, { _, user, db }) => {
    const answer = await db.Answer.findById(data.answer);
    const comment = new db.Comment({ comment: data.comment, author: user.id });
    const newComment = await comment.save();
    answer.comments = _.union(answer.comments, [newComment.id]);
    return answer.save();
  }
};
