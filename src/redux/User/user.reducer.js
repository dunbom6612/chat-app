import { SET_USER, REMOVE_USER } from './user.type';

const loadFromLocalStorage = () => {
  try {
    const seriallizedState = localStorage.getItem('currentUser');
    if (seriallizedState === null) {
      return undefined;
    }
    return JSON.parse(seriallizedState);
  } catch (err) {
    return undefined;
  }
};

const INITIAL_STATE = {
  currentUser: loadFromLocalStorage()
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.user
      };
    case REMOVE_USER:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

export default reducer;
