import React from 'react';
import PropTypes from 'prop-types';
import './chat-list.scss';
import ChatPerson from './chat-person/ChatPerson';
import avtme from '../../assets/images/me-avt.jfif';
import avtfriend from '../../assets/images/friend-avt.jfif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

ChatList.propTypes = {};

function ChatList(props) {
  return (
    <div className="chat">
      <div className="chat__left">
        <div className="chat-me">
          <ChatPerson image={avtme} name="me" />
        </div>
        <div className="chat-friend-container">
          <div className="chat-search-container">
            <input placeholder="Search" className="chat-search" />
            <FontAwesomeIcon icon={faSearch} className="chat-search-icon" />
          </div>
          <ul className="chat-friend-list">
            <li className="chat-friend-item">
              <ChatPerson image={avtfriend} name="Friend" />
              <div className="chat-friend-time">7:09PM</div>
            </li>
            <li className="chat-friend-item">
              <ChatPerson image={avtfriend} name="Friend" />
              <div className="chat-friend-time">7:09PM</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="chat__right">
        <div className="chat-information-wrapper">
          <ChatPerson image={avtfriend} name="Friend" />
        </div>

        <div className="chat-pane">
          <div
            className="chat-detais"
            style={{ overflowY: 'auto', height: '100%' }}
          >
            <div className="chat-friend">
              <img className="chat-me-avartar" src={avtfriend}></img>
              <div className="chat-pane-frame">{'lorem'}</div>
            </div>

            <div className="chat-friend">
              <img className="chat-me-avartar" src=""></img>
              <div className="chat-pane-frame">{'lorem'}</div>
            </div>

            <div className="chat-friend">
              <img className="chat-me-avartar" src=""></img>
              <div className="chat-pane-frame">{'lorem'}</div>
            </div>

            <div className="chat-friend">
              <img className="chat-me-avartar" src=""></img>
              <div className="chat-pane-frame">{'lorem'}</div>
            </div>

            <div className="chat-friend">
              <img className="chat-me-avartar" src=""></img>
              <div className="chat-pane-frame">{'lorem'}</div>
            </div>

            <div className="chat-friend">
              <img className="chat-me-avartar" src=""></img>
              <div className="chat-pane-frame">{'lorem'}</div>
            </div>
          </div>

          {/* floating text input */}
          <div className="chat-input-container">
            <textarea placeholder="Aa" className="chat-input"></textarea>
            <button className="chat-send">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
