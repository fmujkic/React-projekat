import React from 'react';

import './input.css';
import closeIcon from '../../icons/send.png';


const Input = ({message, setMessage, sendMessage }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}><img src={closeIcon} alt="close icon" /></button>
  </form>
)

export default Input;