import React, { useEffect, useState } from 'react';
import './chat.scss';
import ChatPerson from './ChatFeed/chat-person/ChatPerson';
import avtme from '../../assets/images/me-avt.jfif';
import avtfriend from '../../assets/images/friend-avt.jfif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './ChatFeed/ChatFeed';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ChatList from './ChatList/ChatList';
import { render } from '@testing-library/react';

function Chat({ customized }) {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [userChatEngine, setUserChatEngine] = useState(null);
  console.log(currentUser);

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem('user');
    history.push('/login');
  };

  const getAvatar = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
  };

  useEffect(() => {
    axios
      .get('https://api.chatengine.io/users/me', {
        headers: {
          'project-id': 'c9637e5b-9160-4722-867a-bbcbfd9ab3f4',
          'user-name': currentUser.email,
          'user-secret': currentUser.uid
        }
      })
      .then((data) => {
        setLoading(false);
        setUserChatEngine(data);
      })
      .catch(() => {
        let formData = new FormData();
        formData.append('email', currentUser.email);
        formData.append('username', currentUser.email);
        formData.append('secret', currentUser.uid);
        getAvatar(currentUser.photoURL).then((avatar) => {
          formData.append('avatar', avatar, avatar.name);
          axios
            .post('https://api.chatengine.io/users', formData, {
              headers: { 'private-key': '981cb2fd-3b71-4525-91ff-315c1063253a' }
            })
            .then((data) => {
              setLoading(false);
              setUserChatEngine(data);
            })
            .catch((error) => console.log(error));
        });
      });
  }, [currentUser, history]);

  if (!userChatEngine || !currentUser) return 'Loading...';

  return (
    <div className="chat">
      <header className="chat-header">
        <button className="chat-logout btn" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div style={{ fontFamily: "'Poppins', sans-serif" }}>
        <ChatEngine
          projectID="c9637e5b-9160-4722-867a-bbcbfd9ab3f4"
          userName={currentUser.email}
          userSecret={currentUser.uid}
          className="chat-engine"
          height="calc(100vh - 13rem)"
          renderChatList={(chatAppProps) => (
            <ChatList {...chatAppProps} currentUser={userChatEngine} />
          )}
          renderChatSetting={(chatAppProps) => <div {...chatAppProps}></div>}
          renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        />
      </div>
    </div>
  );
}

export default Chat;
