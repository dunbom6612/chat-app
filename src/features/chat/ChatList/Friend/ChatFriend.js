import React from 'react';
import './chat-friend.scss';
import moment from 'moment';

function ChatFriend({ image, name, active, lastMessage }) {
  const distance =
    lastMessage && lastMessage.created !== ''
      ? moment(new Date(lastMessage?.created)).fromNow()
      : '';
  return (
    <div className={`friend ${active ? 'active' : ''}`}>
      <div className="friend-detail">
        <span className="friend-avatar">
          <img className="friend-avatar" src={image} alt="avatar" />
        </span>
        <div className="friend-information">
          <h4 className="friend-name">{name}</h4>
          <div className="friend-last-message">{lastMessage?.text}</div>
        </div>
      </div>

      <div className="friend-time">{distance}</div>
    </div>
  );
}

export default ChatFriend;
