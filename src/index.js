import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import Login from './features/login/Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const ChatList = React.lazy(() => import('./features/chat/ChatList'));

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Switch>
            <PrivateRoute path="/" component={ChatList} />
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
