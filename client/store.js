import _ from 'lodash';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const initialState = {
  message: {
    unread: [],
    conversations: [],
    updatedConversation: null
  },
};

export const actionTypes = {
  GET_CONVERSATIONS: 'GET_CONVERSATIONS',
  READ_CONVERSATION: 'READ_CONVERSATION',
  ADD_UNREAD: 'ADD_UNREAD',
  GET_UNREAD_MESSAGES: 'GET_UNREAD_MESSAGES'
};

// REDUCERS

function union(arrayOne, arrayTwo) {
  const newArray = [...arrayOne];
  const newItems = [];
  arrayTwo.forEach((item) => {
    let newItem = true;
    newArray.forEach((item2) => {
      if (item._id ===  item2._id) {
        newItem = false;
      }
    });
    if(newItem) {
      newItems.push(item);
    }
  });
  return [...newArray, ...newItems];
}

export const reducer = (state = initialState, action) => {
  let unread;
  switch (action.type) {
    case actionTypes.GET_CONVERSATIONS:
      return {...state,  message: { ...state.message, conversations: action.payload } };
    case actionTypes. READ_CONVERSATION:
      return {...state,  message: { ...state.message, updatedConversation: action.payload } };
    case actionTypes.GET_UNREAD_MESSAGES:
      unread = union(state.message.unread, action.payload);
      return { ...state, message: { ...state.message, unread } };
    case actionTypes.ADD_UNREAD:
      return { ...state, message: {...state.message, unread: _.union([...state.message.unread], [action.payload]) } };
    default: return state;
  }
};

// ACTIONS
export const getConversations = () => (dispatch) => {
  axios.defaults.headers.common.Authorization = window.localStorage.getItem('token');
  return axios.get('/api/conversations')
    .then(({ data }) => {
      dispatch({ type: actionTypes.GET_CONVERSATIONS, payload: data.conversations });
    });
};

export const readConversation = (id) => (dispatch) => {
  axios.defaults.headers.common.Authorization = window.localStorage.getItem('token');
  return axios.put(`/api/conversations/${id}/read`)
    .then(({ data }) => {
      dispatch({ type: actionTypes.READ_CONVERSATION, payload: data.conversation });
    });
};

export const getUnread = () => (dispatch) => {
  axios.defaults.headers.common.Authorization = window.localStorage.getItem('token');
  return axios.get('/api/messages/unread')
    .then(({ data }) => {
      dispatch({ type: actionTypes.GET_UNREAD_MESSAGES, payload: data.messages });
    });
};

export const addUnread = (message) => (dispatch) => dispatch({ type: actionTypes.ADD_UNREAD, payload: message });

export const initStore = (initialState = initialState) => {
  const middleware = [thunkMiddleware];
  const finalCreateStore = compose(
    applyMiddleware(...middleware)
  )(createStore);
  return finalCreateStore(reducer);
};
