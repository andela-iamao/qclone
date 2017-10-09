// const Event = require('./event');
const allQuestions = require('./allQuestions');
const allTopics = require('./allTopics');
const getLoggedInUser = require('./getLoggedInUser');
const getUser = require('./user/getUser');
const getUserAnswers = require('./user/getUserAnswers');
const getNotifications = require('./user/getNotifications');
const getAnswerRequest = require('./question/getAnswerRequests');
const getRegistrationProgress = require('./getRegistrationProgress');
const getPersonalQuestions = require('./question/getPersonalQuestions');
const getQuestionsToAnswer = require('./question/getQuestionsToAnswer');
const getRelatedQuestions = require('./question/getRelatedQuestions');
const getQuestion = require('./question/getQuestion');
const getAnswerLater = require('./question/getAnswerLater');
const getAnswer = require('./answer/getAnswer');
const getDrafts = require('./question/getDrafts');

module.exports = {
  allQuestions,
  allTopics,
  getLoggedInUser,
  getRegistrationProgress,
  getPersonalQuestions,
  getQuestionsToAnswer,
  getRelatedQuestions,
  getQuestion,
  getDrafts,
  getAnswer,
  getUser,
  getUserAnswers,
  getAnswerRequest,
  getAnswerLater,
  getNotifications
};
