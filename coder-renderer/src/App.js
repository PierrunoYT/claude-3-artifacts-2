import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import CodeRenderer from './components/CodeRenderer';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Coder Renderer</h1>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={
              <>
                <div className="column left-column">
                  <h2>Chat</h2>
                  <Chat />
                </div>
                <div className="column right-column">
                  <h2>Live Preview</h2>
                  <CodeRenderer />
                </div>
              </>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
