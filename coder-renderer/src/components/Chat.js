import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText && !imageUrl) return;

    const newMessage = { role: 'user', content: [{ type: 'text', text: inputText }] };
    if (imageUrl) {
      newMessage.content.push({ type: 'image_url', image_url: { url: imageUrl } });
    }

    setMessages([...messages, newMessage]);
    setInputText('');
    setImageUrl('');
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.message) {
        setMessages(prevMessages => [...prevMessages, data.message]);
      } else if (data.error) {
        setError(data.error);
      } else {
        setError('Unexpected response from server');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">
              {Array.isArray(message.content) ? (
                message.content.map((content, i) => (
                  content.type === 'text' ? 
                    <p key={i}>{content.text}</p> : 
                    <img key={i} src={content.image_url.url} alt="User uploaded" />
                ))
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter image URL..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;