import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { getOrCreateChat } from 'react-chat-engine';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import defaultAvt from '../../../assets/images/default-img.png';
import AuthContext from '../../../contexts/AuthContext';
import ChatMe from './Me/ChatMe';
import ChatFriend from './Friend/ChatFriend';
import { setUser } from '../../../redux/User/user.action';
import './chat-list.scss';

ChatList.propTypes = {};

function ChatList({ ...props }) {
  const { chats, activeChat, setActiveChat, avatar, userName, creds } = props;

  const [searchValue, setSearhValue] = useState('');
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
              online={friend.person.is_online}
              lastMessage={chat.last_message}
            />
          </li>
        )
      );
    });
  };

  return (
    <div className="chat-list">
      <div className="chat-me">
        <ChatMe image={avatar ? avatar : defaultAvt} name={userName} />
      </div>
      <div className="chat-friend-container">
        <form className="chat-find-container" onSubmit={handleSearchFriend}>
          <input
            placeholder="Search email"
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
