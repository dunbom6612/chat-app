import React from 'react';
import './chat-person.scss';

function ChatPerson({ image, name, status }) {
  return (
    <div className="person">
      <span className="person-avartar">
        <img className="person-avartar" src={image} alt="avartar"></img>
      </span>
      <div className="person-information">
        <h4>{name}</h4>
        <div className="job">{status}</div>
      </div>
    </div>
  );
}

export default ChatPerson;
