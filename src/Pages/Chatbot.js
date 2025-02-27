import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';

// Import the search function from utils
import { searchDocumentation } from '../utils/searchUtils';

// Example documentation data (can also be imported from a separate JSON file)
const documentationData = require('../documentation.json');

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMessageSend = () => {
    if (userMessage.trim()) {
      setMessages([...messages, { sender: 'user', text: userMessage }]);
      setUserMessage('');
      setLoading(true);

      // Use the search function to find relevant documentation
      const botResponse = searchDocumentation(userMessage, documentationData);

      // Simulate bot response with a delay
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: botResponse },
        ]);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Paper sx={{ padding: 2, height: 400, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, overflowY: 'auto', marginBottom: 2 }}>
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 1,
              }}
            >
              <Typography
                sx={{
                  backgroundColor: msg.sender === 'user' ? '#1976d2' : '#f1f1f1',
                  color: msg.sender === 'user' ? 'white' : 'black',
                  borderRadius: 2,
                  padding: 1,
                  maxWidth: '70%',
                }}
              >
                {msg.text}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:"center" }}>
          <TextField
            fullWidth
            label="Ask your question"
            variant="outlined"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            sx={{ marginRight: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleMessageSend}
            disabled={!userMessage.trim() || loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Send'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Chatbot;
