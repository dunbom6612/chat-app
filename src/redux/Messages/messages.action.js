import { SET_MESSAGES, ADD_MESSAGE } from './messages.type';

export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    messages: messages
  };
};

export const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    message: message
  };
};
