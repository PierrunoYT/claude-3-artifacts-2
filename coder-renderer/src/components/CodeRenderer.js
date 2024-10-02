import React, { useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import './CodeRenderer.css';

function CodeRenderer() {
  const [code, setCode] = useState('// Write your code here');

  return (
    <div className="code-renderer">
      <LiveProvider code={code}>
        <div className="live-editor">
          <LiveEditor onChange={setCode} />
        </div>
        <div className="live-preview">
          <LiveError />
          <LivePreview />
        </div>
      </LiveProvider>
    </div>
  );
}

export default CodeRenderer;