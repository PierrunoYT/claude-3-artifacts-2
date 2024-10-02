require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Coder Renderer backend!' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": `${process.env.SITE_URL}`,
        "X-Title": `${process.env.SITE_NAME}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "anthropic/claude-3.5-sonnet",
        "messages": req.body.messages
      })
    });

    const data = await response.json();
    res.json({ message: data.choices[0].message });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});