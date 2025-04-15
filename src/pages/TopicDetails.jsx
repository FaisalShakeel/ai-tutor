import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  CircularProgress,
  Alert,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';

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
  },
});

const TopicDetailsPage = () => {
  const { id } = useParams(); // Get topic ID from URL
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate API call (replace with real API in production)
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        // Mock data (replace with axios.get(`/api/topics/${id}`))
        const mockTopic = {
          id,
          name: 'Fractions Basics',
          grade: 6,
          strand: 'Number System',
          description: 'Learn to add and subtract fractions with ease.',
          content: {
            text: 'Fractions represent parts of a whole. To add fractions with the same denominator, add the numerators and keep the denominator. For example, 1/4 + 2/4 = 3/4. For different denominators, find a common denominator first.',
            videoUrl: '', // Placeholder (empty for demo)
          },
          progress: 60, // Sample progress
        };
        setTimeout(() => {
          setTopic(mockTopic);
          setLoading(false);
        }, 500); // Simulate network delay
      } catch (err) {
        setError('Failed to load topic. Please try again.');
        setLoading(false);
      }
    };

    fetchTopic();
  }, [id]);

  // Handle invalid ID or navigation
  if (!id) {
    navigate('/topics');
    return null;
  }

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
      <Container maxWidth="lg" sx={{  minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
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
            {topic.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Grade {topic.grade} • {topic.strand}
          </Typography>
        </Box>

        {/* Main Content */}
        <Box sx={{ width: '100%', py: { xs: 4, md: 6 } }}>
          <Container maxWidth={false} sx={{ px: { xs: 3, md: 6 }, maxWidth: '1200px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Progress Card */}
              <Card sx={{ mb: 4, bgcolor: 'background.default' }}>
                <CardContent>
                  <Typography variant="h3" color="text.primary" gutterBottom>
                    Your Progress
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={topic.progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'secondary.main',
                      '& .MuiLinearProgress-bar': { bgcolor: 'primary.main' },
                    }}
                  />
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    {topic.progress}% Complete
                  </Typography>
                </CardContent>
              </Card>

              {/* Lesson Content */}
              <Card sx={{ mb: 4, bgcolor: 'background.default' }}>
                <CardContent>
                  <Typography variant="h3" color="text.primary" gutterBottom>
                    Lesson
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {topic.content.text}
                  </Typography>
                  {/* Video Placeholder */}
                  <Box
                    sx={{
                      position: 'relative',
                      paddingTop: '56.25%', // 16:9 aspect ratio
                      bgcolor: 'grey.100',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {topic.content.videoUrl ? 'Video Loading...' : 'Video Content Coming Soon'}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    component={Link}
                    to="/quiz"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Practice Now
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    component={Link}
                    to={`/chat/${id}`}
                    variant="outlined"
                    color="primary"
                    size="large"
                  >
                    Ask Tutor
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
      </Container>
    </ThemeProvider>
  );
};

export default TopicDetailsPage;