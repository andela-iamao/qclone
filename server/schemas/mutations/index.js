const createQuestion = require('./question/createQuestion');
const followQuestion = require('./question/followQuestion');
const shareQuestion = require('./question/shareQuestion');
const updateQuestion = require('./question/updateQuestion');
const deleteQuestion = require('./question/deleteQuestion');
const requestAnswer = require('./question/requestAnswer');
const answerLater = require('./question/answerLater');
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
const setDefaultCredentials = require('./user/setDefaultCredentials');
const updateNotification = require('./user/updateNotification');
// END USER

// TOPIC
const createTopic = require('./topic/createTopic');
// END TOPIC

// Answer
const createAnswer = require('./answer/createAnswer');
const updateAnswer = require('./answer/updateAnswer');
const upvoteAnswer = require('./answer/upvoteAnswer');
const deleteAnswer = require('./answer/deleteAnswer');
const deleteDraft = require('./answer/deleteDraft');


const addComment = require('./comment/addComment');

module.exports = {
  createQuestion,
  shareQuestion,
  passQuestion,
  followQuestion,
  updateQuestion,
  deleteQuestion,
  requestAnswer,
  registerUser,
  loginUser,
  updateUser,
  followUser,
  updateUserAvatar,
  updateUserInterest,
  addCredentials,
  setDefaultCredentials,
  updateRegistrationProgress,
  updateUserKnowledge,
  createTopic,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  deleteDraft,
  upvoteAnswer,
  addComment,
  answerLater,
  updateNotification
};
