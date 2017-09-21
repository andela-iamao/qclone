// const Event = require('./event');
const allQuestions = require('./allQuestions');
const allTopics = require('./allTopics');
const getLoggedInUser = require('./getLoggedInUser');
const getRegistrationProgress = require('./getRegistrationProgress');
const getPersonalQuestions = require('./question/getPersonalQuestions');
const getQuestion = require('./question/getQuestion');
const getAnswer = require('./answer/getAnswer');

module.exports = {
  allQuestions,
  allTopics,
  getLoggedInUser,
  getRegistrationProgress,
  getPersonalQuestions,
  getQuestion,
  getAnswer
};
