import axios from 'axios';
import md5 from 'md5';
import React, { useEffect, useState } from 'react';
import { ChatEngine } from 'react-chat-engine';
import { useSelector } from 'react-redux';
import './chat.scss';
import ChatFeed from './ChatFeed/ChatFeed';
import ChatList from './ChatList/ChatList';

function Chat(props) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [userChatEngine, setUserChatEngine] = useState(null);

  const getAvatar = async (email) => {
    const md5Email = md5(email);
    const response = await fetch(
      `https://www.gravatar.com/avatar/${md5Email}?d=robohash`
    );
    const data = await response.blob();
    console.log('pic', data);
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
        setUserChatEngine(data);
      })
      .catch(() => {
        let formData = new FormData();
        formData.append('email', currentUser.email);
        formData.append('username', currentUser.email);
        formData.append('secret', currentUser.uid);
        getAvatar(currentUser.email).then((avatar) => {
          console.log('avatar', avatar);
          formData.append('avatar', avatar, avatar.name);
          axios
            .post('https://api.chatengine.io/users', formData, {
              headers: { 'private-key': '981cb2fd-3b71-4525-91ff-315c1063253a' }
            })
            .then((data) => {
              setUserChatEngine(data);
            })
            .catch((error) => console.log(error));
        });
      });
  }, [currentUser]);

  if (!currentUser) return <div className="spinner"></div>;

  return (
    <div className="chat">
      <div style={{ fontFamily: "'Poppins', sans-serif", height: 'inherit' }}>
        <ChatEngine
          projectID="c9637e5b-9160-4722-867a-bbcbfd9ab3f4"
          userName={currentUser.email}
          userSecret={currentUser.uid}
          className="chat-engine"
          height="calc(100vh - 2rem)"
          renderChatList={(chatAppProps) => (
            <ChatList {...chatAppProps} avatar={userChatEngine?.data?.avatar} />
          )}
          renderChatSetting={(chatAppProps) => <div {...chatAppProps}></div>}
          renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        />
      </div>
    </div>
  );
}

export default Chat;
