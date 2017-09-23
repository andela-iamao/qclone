const createQuestion = require('./question/createQuestion');
const followQuestion = require('./question/followQuestion');
const shareQuestion = require('./question/shareQuestion');
const updateQuestion = require('./question/updateQuestion');
const deleteQuestion = require('./question/deleteQuestion');
const registerUser = require('./auth/registerUser');
const loginUser = require('./auth/loginUser');
const updateUserInterest = require('./updateUserInterest');
const updateRegistrationProgress = require('./auth/updateRegistrationProgress');

// USER
const updateUserKnowledge = require('./user/updateUserKnowledge');
const passQuestion = require('./user/passQuestion');
const updateUserAvatar = require('./user/updateUserAvatar');
const updateUser = require('./user/updateUser');
const followUser = require('./user/followUser');
const addCredentials = require('./user/addCredentials');
// END USER

// TOPIC
const createTopic = require('./topic/createTopic');
// END TOPIC

// Answer
const createAnswer = require('./answer/createAnswer');
const updateAnswer = require('./answer/updateAnswer');
const deleteAnswer = require('./answer/deleteAnswer');

module.exports = {
  createQuestion,
  shareQuestion,
  passQuestion,
  followQuestion,
  updateQuestion,
  deleteQuestion,
  registerUser,
  loginUser,
  updateUser,
  followUser,
  updateUserAvatar,
  updateUserInterest,
  addCredentials,
  updateRegistrationProgress,
  updateUserKnowledge,
  createTopic,
  createAnswer,
  updateAnswer,
  deleteAnswer
};
