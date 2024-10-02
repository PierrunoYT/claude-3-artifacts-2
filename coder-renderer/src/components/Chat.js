import React, { useState } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });

      const data = await response.json();
      setMessages(prevMessages => [...prevMessages, data.message]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content.map((content, i) => (
              content.type === 'text' ? 
                <p key={i}>{content.text}</p> : 
                <img key={i} src={content.image_url.url} alt="User uploaded" />
            ))}
          </div>
        ))}
      </div>
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