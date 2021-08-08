import React from 'react';
import './bubble.scss';
import defaultAvatar from '../../../../assets/images/default-img.png';

function BubbleMe(props) {
  let { avatar, text, isMine } = props;
  if (!avatar) {
    avatar = defaultAvatar;
  }
  return (
    <div className={`bubble ${isMine ? 'mine' : ''}`}>
      <img className="bubble-avatar" src={avatar} alt="avatar" />
      <div className="bubble-message">{text}</div>
    </div>
  );
}

export default BubbleMe;
