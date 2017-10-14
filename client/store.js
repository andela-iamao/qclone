import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const initialState = {
  message: {
    unread: [],
    conversations: []
  },
};

export const actionTypes = {
  GET_CONVERSATIONS: 'GET_CONVERSATIONS',
  TICK: 'TICK'
};

// REDUCERS
export const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.GET_CONVERSATIONS:
      return {...state,  message: { ...state.message, conversations: action.payload } };
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

export const getLoggedInUser = () => (dispatch) => {
  axios.defaults.headers.common.Authorization = window.localStorage.getItem('token');
  return axios.get('/api/conversations')
    .then(({ data }) => {
      dispatch({ type: actionTypes.GET_CONVERSATIONS, payload: data.conversations });
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
