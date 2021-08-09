import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { setUser } from '../../redux/User/user.action';
import './Login.scss';

Login.propTypes = {};

function Login(props) {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { loginWithGoogle, loginWithFacebook } = useAuth();

  const handleClick = (e, loginMethod) => {
    setError('');
    loginMethod()
      .then((result) => {
        dispatch(setUser(result.user));
        history.push('/');
      })
      .catch((error) => {
        setError(error.toString());
      });
  };

  return (
    <div className="login">
      <h1>CHAT APP</h1>

      <div className="login-buttons">
        <button
          className="btn login-google"
          onClick={(e) => handleClick(e, loginWithGoogle)}
        >
          <FontAwesomeIcon className="icon" icon={faGoogle} />
          <span>Login with Gmail</span>
        </button>
        <button
          className="btn login-facebook"
          onClick={(e) => handleClick(e, loginWithFacebook)}
        >
          <FontAwesomeIcon className="icon" icon={faFacebook} />
          <span>Login with Facebook</span>
        </button>
      </div>
      <p className="error">{error}</p>
    </div>
  );
}

export default Login;
