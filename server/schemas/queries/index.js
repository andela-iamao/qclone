// const Event = require('./event');
const allQuestions = require('./allQuestions');
const allTopics = require('./allTopics');
const getLoggedInUser = require('./getLoggedInUser');
const getRegistrationProgress = require('./getRegistrationProgress');
const getPersonalQuestions = require('./question/getPersonalQuestions');

module.exports = {
  allQuestions,
  allTopics,
  getLoggedInUser,
  getRegistrationProgress,
  getPersonalQuestions
};
