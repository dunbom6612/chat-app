import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import Login from './features/login/Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { Provider } from 'react-redux';
import store from './redux/store';

const Chat = React.lazy(() => import('./features/chat/Chat'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute path="/" exact component={Chat} />
            </Switch>
          </BrowserRouter>
        </Suspense>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
