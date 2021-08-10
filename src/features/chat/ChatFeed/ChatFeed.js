import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { IsTyping, sendMessage } from 'react-chat-engine';
import { useDispatch, useSelector } from 'react-redux';
import BubbleMe from './BubbleMe/BubbleMe';
import {
  setMessages,
  addMessage
} from '../../../redux/Messages/messages.action';
import './chat-feed.scss';

function ChatFeed(props) {
  const [text, setText] = useState('');
  const bottomChat = useRef(null);
  const { userName, chats, creds, activeChat, messages } = props;
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentMessages = useSelector(
    (state) => state.messages.currentMessages
  );
  const [realtimeMessages, setRealtimeMessages] = useState([]);

  console.log('messages', messages);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('call api get message');
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
        dispatch(setMessages(res.data));
        bottomChat?.current.scrollIntoView();
      });
  }, [activeChat, currentUser.email, currentUser.uid, dispatch]);

  useEffect(() => {
    setRealtimeMessages(Object.values(messages));
    bottomChat?.current.scrollIntoView();
  }, [messages]);

  const renderReadMessage = (message, isMine) => {
    if (!chats) return;
    else
      return chats[`${activeChat}`]?.people.map((person) => {
        if (person.last_read === message.id) {
          return (
            <img
              key={`read-${message.id}-${person.person.username}`}
              alt="user-read"
              className={`chat-read-avt }`}
              src={person.person.avatar}
            />
          );
        }
        return null;
      });
  };

  const renderRealtimeMessage = () => {
    console.log('realtimeMessages', realtimeMessages);
    const messagesComponent =
      realtimeMessages.length > 0
        ? realtimeMessages.map((message) => {
            const sender = message.sender;
            const isMine = message.sender_username === userName;
            if (message.custom_json == activeChat) {
              return (
                <div
                  className={`chat-bubble-wrapper ${isMine ? 'mine' : ''}`}
                  key={`key-${message.id}`}
                >
                  <BubbleMe
                    avatar={sender.avatar}
                    text={message.text}
                    isMine={isMine}
                    id={message.id}
                  />
                  {renderReadMessage(message, isMine)}
                </div>
              );
            }
          })
        : null;
    return <>{messagesComponent}</>;
  };

  const renderOldMessage = () => {
    const messagesComponent =
      currentMessages.length > 0
        ? currentMessages.map((message) => {
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
                  id={message.id}
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
    setText('');
    if (text.length > 0) {
      sendMessage(
        creds,
        activeChat,
        {
          text,
          sender_username: userName,
          custom_json: activeChat
        },
        (response) => {
          bottomChat?.current.scrollIntoView();
        }
      );
    }
  };
  const handleChange = (event) => {
    setText(event.target.value);
    // isTyping(props, activeChat);
  };

  console.log('renderRealtimeMessage', renderRealtimeMessage());
  return (
    <div className="chat-feed">
      <div className="chat-pane">
        <div className="chat-details">
          {activeChat && renderOldMessage()}
          {renderRealtimeMessage()}
          <div id="chat-details-bottom" ref={bottomChat}></div>
        </div>
        {/* floating text input */}
        {activeChat && (
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
        )}
      </div>
    </div>
  );
}

export default ChatFeed;
