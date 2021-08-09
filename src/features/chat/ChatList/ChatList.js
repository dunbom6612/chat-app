import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { getOrCreateChat } from 'react-chat-engine';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import defaultAvt from '../../../assets/images/default-img.png';
import AuthContext from '../../../contexts/AuthContext';
import ChatPerson from './Me/ChatMe';
import ChatFriend from './Friend/ChatFriend';
import { setUser } from '../../../redux/User/user.action';
import './chat-list.scss';

ChatList.propTypes = {};

function ChatList({ ...props }) {
  const { chats, activeChat, setActiveChat, currentUser, userName, creds } =
    props;
  const { logout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchValue, setSearhValue] = useState('');
  const userAvt = currentUser?.data.avatar ?? defaultAvt;
  console.log(props);

  const handleSearchFriend = (event) => {
    event.preventDefault();
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [searchValue], title: searchValue },
      () => setSearhValue('')
    );
  };

  const renderChatList = () => {
    if (!chats) {
      return null;
    }
    const chatdatas = Object.values(chats).sort((chat1, chat2) => {
      return chat1.last_message.created > chat2.last_message.created;
    });

    return chatdatas.map((chat) => {
      const friend = chat.people.find(
        (person) => person.person.username !== userName
      );
      const isActive = activeChat === chat.id;

      return (
        friend && (
          <li
            className={`chat-friend-item ${isActive ? 'active' : ''}`}
            key={`chat-list-${chat.id}`}
            onClick={() => setActiveChat(chat.id)}
          >
            <ChatFriend
              image={friend.person.avatar}
              name={`${friend.person.username}`}
              active={friend.person.is_online}
              lastMessage={chat.last_message}
            />
          </li>
        )
      );
    });
  };

  const handleClickLogout = () => {
    console.log('log out');
    logout();
    history.push('/');
    dispatch(setUser(null));
  };

  return (
    <div className="chat-list">
      <div className="chat-me">
        <ChatPerson image={userAvt} name={userName} />
        <button className="chat-logout-btn" onClick={handleClickLogout}>
          Logout
        </button>
      </div>
      <div className="chat-friend-container">
        <form className="chat-find-container" onSubmit={handleSearchFriend}>
          <input
            placeholder="Username"
            className="chat-search"
            value={searchValue}
            onSubmit={handleSearchFriend}
            onChange={(e) => setSearhValue(e.target.value)}
          />
          <FontAwesomeIcon className="chat-search-icon" icon={faSearch} />
        </form>
        <ul className="chat-friend-list">{renderChatList()}</ul>
      </div>
    </div>
  );
}

export default ChatList;
