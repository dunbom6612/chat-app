import React from 'react';
import './chat-me.scss';

function ChatMe({ image, name, active }) {
  return (
    <div className={`me ${active ? 'active' : ''}`}>
      <span className="me-avartar">
        <img className="me-avartar" src={image} alt="avartar" />
      </span>
      <div className="me-information">
        <h4>{name}</h4>
      </div>
    </div>
  );
}

export default ChatMe;
