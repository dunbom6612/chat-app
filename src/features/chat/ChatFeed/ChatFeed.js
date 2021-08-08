import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './chat-feed.scss';
import ChatPerson from './chat-person/ChatPerson';
import { sendMessage, isTyping, getMessages } from 'react-chat-engine';
import BubbleMe from './BubbleMe/BubbleMe';
import axios from 'axios';
import AuthContext, { useAuth } from '../../../contexts/AuthContext';

function ChatFeed(props) {
  const [text, setText] = useState('');
  const { userName, chats, creds, activeChat, messages } = props;
  const { currentUser } = useAuth(AuthContext);
  const [messageDatas, setMessageDatas] = useState([]);

  useEffect(() => {
    if (!activeChat) return;
    let link = `https://api.chatengine.io/chats/${activeChat}/messages/`;
    axios
      .get(link, {
        headers: {
          'project-id': 'c9637e5b-9160-4722-867a-bbcbfd9ab3f4',
          'user-name': currentUser.email,
          'user-secret': currentUser.uid
        }
      })
      .then((res) => {
        setMessageDatas(res.data);
      });
  }, [activeChat]);

  const renderHeader = chats ? (
    Object.keys(chats).length > 0 ? (
      <div className="chat-information-wrapper">
        {chats[`${activeChat}`]?.people.map((person) => {
          const info = person.person;
          if (info.username === userName) return;
          else
            return (
              <ChatPerson
                image={info.avatar}
                name={`${info.username}`}
                active={info.is_online}
                key={`chat-${info.username}`}
              />
            );
        })}
      </div>
    ) : (
      'LET CHAT RIGHT NOW'
    )
  ) : (
    <div>{'...isLoading'}</div>
  );
  const renderReadMessage = (message, isMine) => {
    if (!chats) return;
    else
      return chats[`${activeChat}`]?.people.map((person) => {
        if (person.last_read === message.id)
          return (
            <img
              key={`read-${message.id}-${person.person.username}`}
              alt="user-read"
              className={`chat-read-avt }`}
              src={person.person.avatar}
            />
          );
      });
  };

  const renderMessage = () => {
    const messagesComponent =
      messageDatas.length > 0
        ? messageDatas.map((message) => {
            const sender = message.sender;
            const isMine = message.sender_username === userName;
            return (
              <div
                className={`chat-bubble-wrapper ${isMine ? 'mine' : ''}`}
                key={`key-${message.id}`}
              >
                <BubbleMe
                  avatar={sender.avatar}
                  text={message.text}
                  isMine={isMine}
                />

                {renderReadMessage(message, isMine)}
              </div>
            );
          })
        : null;
    return <>{messagesComponent}</>;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (text.length > 0) {
      sendMessage(
        creds,
        activeChat,
        {
          text,
          sender_username: userName,
          custom_json: { chat: activeChat }
        },
        setText('')
      );
    }
  };
  const handleChange = (event) => {
    setText(event.target.value);
    // isTyping(props, activeChat);
  };

  return (
    <div className="chat-feed">
      {renderHeader}
      <div className="chat-pane">
        <div className="chat-details">{renderMessage()}</div>

        {/* floating text input */}
        <form className="chat-input-container" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Aa"
            className="chat-input"
            value={text}
            onChange={handleChange}
            onSubmit={handleSubmit}
          ></input>
          <button className="chat-send" type="submit" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatFeed;
