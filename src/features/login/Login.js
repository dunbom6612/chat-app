import React, { useState } from 'react';
import './Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

Login.propTypes = {};

function Login(props) {
  const [error, setError] = useState('');
  const history = useHistory();
  const handleClick = async (e, method) => {
    try {
      setError('');
      if (method === 'google') {
        await loginWithGoogle();
      } else {
        await loginWithFacebook();
      }
      history.push('/chat-list');
    } catch {
      setError('Failed to login');
    }
  };

  const { loginWithGoogle, loginWithFacebook } = useAuth();

  return (
    <div class="login">
      <div className="login-buttons">
        <p className="error">{error}</p>
        <button
          className="btn login-google"
          onClick={(e) => handleClick(e, 'google')}
        >
          <FontAwesomeIcon className="icon" icon={faGoogle} />
          Login with Gmail
        </button>
        <button
          className="btn login-facebook"
          onClick={(e) => handleClick(e, 'facebook')}
        >
          <FontAwesomeIcon className="icon" icon={faFacebook} />
          Login with Facebook
        </button>
      </div>
    </div>
  );
}

export default Login;
