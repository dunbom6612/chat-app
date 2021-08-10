import React from 'react';
import './chat-friend.scss';
import defaultAvatar from '../../../../assets/images/default-img.png';
import moment from 'moment';

function ChatFriend({ image, name, online, lastMessage }) {
  const distance =
    lastMessage && lastMessage.created !== ''
      ? moment(new Date(lastMessage?.created)).fromNow()
      : '';

  return (
    <div className="friend">
      <div className="friend-detail">
        <span className={`friend-avatar ${online ? 'active' : ''}`}>
          <img
            className={`friend-avatar`}
            src={image ? image : defaultAvatar}
            alt="avatar"
          />
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
