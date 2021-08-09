import { combineReducers } from 'redux';
import useReducer from './User/user.reducer';
import messagesReducer from './Messages/messages.reducer';

const rootReducer = combineReducers({
  user: useReducer,
  messages: messagesReducer
});

export default rootReducer;
