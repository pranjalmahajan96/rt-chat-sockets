import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  // WebSocket connection setup goes here
  useEffect(() => {
    // Create a WebSocket connection
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Save the WebSocket instance to state
    setSocket(ws);

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
     // Implement sending messages via WebSocket here
    if (messageInput.trim() !== '') {
      const message = {
        text: messageInput,
        timestamp: new Date().toISOString(),
      };
      console.log(message);
      if (socket) {
        socket.send(JSON.stringify(message));
        setMessageInput('');
      }
    }
  };

  return (
    <div>
      <div>
        <div>
          {messages.map((message, index) => (
            <div key={index}>
              {message}
            </div>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
