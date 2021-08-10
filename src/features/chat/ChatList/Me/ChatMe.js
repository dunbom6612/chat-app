import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../../../contexts/AuthContext';
import { setUser } from '../../../../redux/User/user.action';
import './chat-me.scss';

function ChatMe({ image, name }) {
  const { logout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickLogout = () => {
    console.log('log out');
    logout();
    history.push('/');
    dispatch(setUser(null));
  };
  return (
    <div className={`me `}>
      <span className="me-avartar">
        <img className="me-avartar" src={image} alt="avartar" />
      </span>
      <div className="me-information">
        <h4>{name}</h4>
        <button className="chat-logout-btn" onClick={handleClickLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ChatMe;
