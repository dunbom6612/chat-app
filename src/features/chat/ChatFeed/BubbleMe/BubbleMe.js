import React from 'react';
import './bubble.scss';
import defaultAvatar from '../../../../assets/images/default-img.png';

function BubbleMe(props) {
  let { avatar, text, isMine, id } = props;
  if (!avatar) {
    avatar = defaultAvatar;
  }

  const addHTTP = (url) => {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = 'http://' + url;
    }
    return url;
  };

  const convertIcon = (text) => {
    const regexSmiley = /((?<=\s)(:\))(?=\s))|^((:\))(?=\s))|((?<=\s)(:\)))$/g;
    const regexSad = /((?<=\s)(:\()(?=\s))|^((:\()(?=\s))|((?<=\s)(:\())$/g;
    const regexHaHa =
      /((?<=\s)(:\)\))(?=\s))|^((:\)\))(?=\s))|((?<=\s)(:\)\)))$/g;
    const regexLaugh = /((?<=\s)(:D)(?=\s))|^((:D)(?=\s))|((?<=\s)(:D))$/g;
    const regexMlem = /((?<=\s)(:P)(?=\s))|^((:P)(?=\s))|((?<=\s)(:P))$/g;
    const regexHeart = /((?<=\s)(<3)(?=\s))|^((<3)(?=\s))|((?<=\s)(<3))$/g;

    // let text = text.match(/[\w\/\.\:\\]+|\s+|[^\s\w]+/g);
    text = text.replaceAll(regexSmiley, '🙂');
    text = text.replaceAll(regexSad, '🙁');
    text = text.replaceAll(regexHaHa, '😀');
    text = text.replaceAll(regexLaugh, '😁');
    text = text.replaceAll(regexMlem, '😋');
    text = text.replaceAll(regexHeart, '💝');
    return text;
  };

  const convertLink = (text) => {
    let words = text.match(/[\w\/\.\:\\]+|\s+|[^\s\w]+/g); // split text taking white space
    const regex =
      /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    words = words.map((word, index) => {
      if (regex.test(word)) {
        const converted = (
          <a
            href={addHTTP(word)}
            target={'_blank'}
            rel="noreferrer noopener"
            key={`bubble-${id}-${index}`}
          >
            {word}
          </a>
        );
        return converted;
      }
      return word;
    });
    return words;
  };

  return (
    <div className={`bubble ${isMine ? 'mine' : ''}`}>
      <img className="bubble-avatar" src={avatar} alt="avatar" />
      <div className="bubble-message">{convertLink(convertIcon(text))}</div>
    </div>
  );
}

export default BubbleMe;
