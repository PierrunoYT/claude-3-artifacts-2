import React from 'react';
import './App.css';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Coder Renderer</h1>
      </header>
      <main className="App-main">
        <div className="column left-column">
          <h2>Chat with OpenRouter</h2>
          <Chat />
        </div>
        <div className="column right-column">
          <h2>Right Column</h2>
          <p>This is the content for the right column.</p>
        </div>
      </main>
    </div>
  );
}

export default App;
