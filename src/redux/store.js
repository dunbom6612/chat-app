import { createStore } from 'redux';

import rootReducer from './rootReducer';
import { throttle } from 'lodash';

const store = createStore(
  rootReducer,

  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(
  throttle(() => {
    localStorage.setItem(
      'currentUser',
      JSON.stringify(store.getState().user?.currentUser)
    );
  }, 1000)
);

export default store;
