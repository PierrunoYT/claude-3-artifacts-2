const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all origins in development
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Coder Renderer backend!' });
});

app.post('/api/chat', async (req, res) => {
  console.log('Received chat request:', req.body);
  
  try {
    console.log('OpenRouter API Key:', process.env.OPENROUTER_API_KEY ? 'Set' : 'Not Set');
    
    const openRouterRequest = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Coder Renderer",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "anthropic/claude-3.5-sonnet",
        "messages": req.body.messages
      })
    };
    
    console.log('Sending request to OpenRouter:', openRouterRequest);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", openRouterRequest);
    
    console.log('OpenRouter API Response Status:', response.status);
    
    const data = await response.json();
    console.log('OpenRouter API Response Body:', data);

    if (data.choices && data.choices[0] && data.choices[0].message) {
      res.json({ message: data.choices[0].message });
    } else {
      console.error('Unexpected API response structure:', data);
      res.status(500).json({ error: 'Unexpected API response structure' });
    }
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log(`OpenRouter API Key: ${process.env.OPENROUTER_API_KEY ? 'Set' : 'Not Set'}`);
});