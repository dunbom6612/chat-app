import React from 'react';
import './chat-person.scss';

function ChatPerson({ image, name, active }) {
  return (
    <div className={`person ${active ? 'active' : ''}`}>
      <span className="person-avartar">
        <img className="person-avartar" src={image} alt="avartar" />
      </span>
      <div className="person-information">
        <h4>{name}</h4>
      </div>
    </div>
  );
}

export default ChatPerson;
