import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';

// Custom theme with white and vibrant light green
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Vibrant light green
      light: '#81C784', // Lighter green for hover
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E8F5E9', // Subtle green tint
    },
    background: {
      default: '#FFFFFF', // Pure white
    },
    text: {
      primary: '#263238', // Dark blue-gray
      secondary: '#546E7A', // Softer gray
    },
  },
  typography: {
    fontFamily: '"Velyra", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: { fontWeight: 600, fontSize: { xs: '1.8rem', md: '2.8rem' } },
    h3: { fontWeight: 500, fontSize: { xs: '1.3rem', md: '1.6rem' } },
    body1: { fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.6 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          textTransform: 'none',
          padding: '10px 24px',
          fontSize: '1.1rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
  },
});

const ChatbotTutorPage = () => {
  const { id } = useParams(); // Get topic ID from URL
  const [topic, setTopic] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Simulate fetching topic data
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        // Mock data (replace with API call: axios.get(`/api/topics/${id}`))
        const mockTopic = {
          id,
          name: 'Fractions Basics',
          grade: 6,
          strand: 'Number System',
        };
        await new Promise((resolve) => setTimeout(resolve, 500));
        setTopic(mockTopic);
        setMessages([
          {
            sender: 'bot',
            text: `Welcome! I'm here to help you with ${mockTopic.name}. Ask me anything about fractions!`,
          },
        ]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load topic. Please try again.');
        setLoading(false);
      }
    };
    fetchTopic();
  }, [id]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setChatLoading(true);

    try {
      // Simulate AI response (replace with Grok API call)
      const mockResponse = {
        text: `For fractions, let's clarify: To add fractions like 1/4 + 1/4, keep the denominator and add the numerators: 1 + 1 = 2, so 2/4, which simplifies to 1/2. Want to try another example?`,
      };
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessages((prev) => [...prev, { sender: 'bot', text: mockResponse.text }]);
      setChatLoading(false);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, I couldn’t process that. Please try again!' },
      ]);
      setChatLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Loading state
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: '100vw',
            minHeight: '100vh',
            bgcolor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      </ThemeProvider>
    );
  }

  // Error state
  if (error || !topic) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: '100vw',
            minHeight: '100vh',
            bgcolor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 3, md: 6 },
          }}
        >
          <Alert severity="error">{error || 'Topic not found.'}</Alert>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '95vw', minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
        {/* Header */}
        <Box
          sx={{
            width: '100%',
            py: 3,
            bgcolor: 'primary.light',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h2" color="text.primary">
            Chat with Your Math Tutor
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Topic: {topic.name} • Grade {topic.grade} • {topic.strand}
          </Typography>
        </Box>

        {/* Main Content */}
        <Box sx={{ width: '100%', py: { xs: 4, md: 6 } }}>
          <Container maxWidth={false} sx={{ px: { xs: 3, md: 6 }, maxWidth: '800px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card sx={{ bgcolor: 'background.default', maxHeight: '70vh', overflowY: 'auto' }}>
                <CardContent sx={{ p: 0 }}>
                  <List sx={{ p: 3 }}>
                    {messages.map((msg, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                          p: 1,
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              sx={{
                                bgcolor: msg.sender === 'user' ? 'primary.light' : 'secondary.main',
                                color: msg.sender === 'user' ? 'text.primary' : 'text.secondary',
                                p: 2,
                                borderRadius: '12px',
                                maxWidth: '80%',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              }}
                            >
                              {msg.text}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                    {chatLoading && (
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              sx={{
                                bgcolor: 'secondary.main',
                                color: 'text.secondary',
                                p: 2,
                                borderRadius: '12px',
                                maxWidth: '80%',
                              }}
                            >
                              Typing...
                            </Typography>
                          }
                        />
                      </ListItem>
                    )}
                    <div ref={messagesEndRef} />
                  </List>
                </CardContent>
              </Card>
              <Box sx={{ mt: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Ask your tutor a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={chatLoading}
                  sx={{ flexGrow: 1 }}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={chatLoading || !input.trim()}
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ width: '100%', py: 4, bgcolor: 'primary.light', textAlign: 'center' }}>
          <Container maxWidth={false} sx={{ px: { xs: 3, md: 6 } }}>
            <Typography variant="body2" color="text.secondary">
              Free math education for all students.{' '}
              <Link
                to="/about"
                style={{ color: theme.palette.primary.main, textDecoration: 'none' }}
              >
                Learn More
              </Link>
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ChatbotTutorPage;