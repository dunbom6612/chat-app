import { ADD_MESSAGE, SET_MESSAGES } from './messages.type';

const INITIAL_STATE = {
  currentMessages: []
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const currentMessages = state.currentMessages;
      const newMessages = [...currentMessages, action.message];
      return {
        ...state,
        currentMessages: newMessages
      };
    case SET_MESSAGES:
      return {
        ...state,
        currentMessages: action.messages
      };
    default:
      return state;
  }
};

export default reducer;
