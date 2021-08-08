import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import avtfriend from '../../../assets/images/friend-avt.jfif';
import defaultAvt from '../../../assets/images/default-img.png';
import './chat-list.scss';
import ChatPerson from '../ChatFeed/chat-person/ChatPerson';
import { getOrCreateChat } from 'react-chat-engine';
import { getElementError } from '@testing-library/react';

ChatList.propTypes = {};

function ChatList({ ...props }) {
  const { chats, activeChat, setActiveChat, currentUser, userName, creds } =
    props;
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
            <ChatPerson
              image={friend.person.avatar}
              name={`${friend.person.username}`}
              active={friend.person.is_online}
            />
            <div className="chat-friend-time">
              {new Date(chat.last_message.created).toLocaleString()}
            </div>
          </li>
        )
      );
    });
  };

  return (
    <div className="chat-list">
      <div className="chat-me">
        <ChatPerson image={userAvt} name={userName} />
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
          <button
            type="submit"
            className="chat-search-button"
            onClick={handleSearchFriend}
          >
            <FontAwesomeIcon className="chat-search-icon" icon={faPlus} />
          </button>
        </form>
        <ul className="chat-friend-list">{renderChatList()}</ul>
      </div>
    </div>
  );
}

export default ChatList;
