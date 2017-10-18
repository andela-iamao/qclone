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
  READ_CONVERSATION: 'READ_CONVERSATION'
};

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CONVERSATIONS:
      return {...state,  message: { ...state.message, conversations: action.payload } };
    case actionTypes. READ_CONVERSATION:
      return {...state,  message: { ...state.message, updatedConversation: action.payload } };
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


export const serverRenderClock = (isServer) => (dispatch) => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() });
};

export const startClock = () => (dispatch) => {
  return setInterval(() => dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() }), 800);
};

export const addCount = () => (dispatch) => {
  return dispatch({ type: actionTypes.ADD });
};

export const initStore = (initialState = initialState) => {
  const middleware = [thunkMiddleware];
  const finalCreateStore = compose(
    applyMiddleware(...middleware)
  )(createStore);
  return finalCreateStore(reducer);
};
