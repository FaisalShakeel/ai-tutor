import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  Container,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion'; // For animations

// Custom theme with vibrant white and light green
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Vibrant light green
      light: '#81C784', // Slightly lighter green for hover
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E8F5E9', // Very subtle green tint for sections
    },
    background: {
      default: '#FFFFFF', // Pure white
    },
    text: {
      primary: '#263238', // Dark blue-gray for contrast
      secondary: '#546E7A', // Softer gray for subtext
    },
  },
  typography: {
    fontFamily: '"Velyra", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: { xs: '2.5rem', md: '4rem' } },
    h2: { fontWeight: 600, fontSize: { xs: '1.8rem', md: '2.8rem' } },
    h3: { fontWeight: 500, fontSize: { xs: '1.3rem', md: '1.6rem' } },
    body1: { fontSize: { xs: '1rem', md: '1.1rem' } },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          textTransform: 'none',
          padding: '12px 28px',
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
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
          },
        },
      },
    },
  },
});

const HomePage = () => {
  const grades = [6, 7, 8, 9, 10, 11, 12];
  const featuredTopics = [
    {
      id: 1,
      grade: 6,
      name: 'Fractions Basics',
      description: 'Add and subtract fractions with confidence.',
    },
    {
      id: 2,
      grade: 8,
      name: 'Linear Equations',
      description: 'Solve equations like a pro.',
    },
    {
      id: 3,
      grade: 10,
      name: 'Quadratics',
      description: 'Dive into parabolas and factoring.',
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '95vw',overflow:"hidden", minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
        {/* Hero Section */}
        <Box
          sx={{
            width: '100%',
            minHeight: { xs: '50vh', md: '70vh' },
            background: 'linear-gradient(120deg, #FFFFFF 40%, #E8F5E9 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            py: { xs: 6, md: 10 },
          }}
        >
          <Container maxWidth={false} sx={{ px: { xs: 3, md: 6 } }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h1"
                color="text.primary"
                gutterBottom
                sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, lineHeight: 1.1 }}
              >
                Math Made Simple
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  maxWidth: '800px',
                  mx: 'auto',
                  mb: 5,
                  fontSize: { xs: '1.1rem', md: '1.5rem' },
                }}
              >
                Explore math for grades 6–12 with our free, interactive platform, powered by AI.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    component={Link}
                    to="/auth"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Start Learning
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    component={Link}
                    to="/auth"
                    variant="outlined"
                    color="primary"
                    size="large"
                  >
                    Sign In
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* Grade Selector Section */}
        <Box sx={{ width: '100%', py: { xs: 6, md: 8 }, bgcolor: 'background.default' }}>
          <Container maxWidth={false} sx={{ px: { xs: 3, md: 6 } }}>
            <Typography
              variant="h2"
              color="text.primary"
              align="center"
              gutterBottom
              sx={{ mb: 6 }}
            >
              Select Your Grade
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {grades.map((grade) => (
                <Grid item key={grade} xs={6} sm={3} md={1.5}>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      component={Link}
                      to={`/topics?grade=${grade}`}
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        py: 1.5,
                        fontSize: '1.1rem',
                        bgcolor: 'primary.main',
                        ':hover': { bgcolor: 'primary.light' },
                      }}
                    >
                      Grade {grade}
                    </Button>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Featured Topics Section */}
        <Box sx={{ width: '100%', py: { xs: 6, md: 8 }, bgcolor: 'secondary.main' }}>
          <Container maxWidth={false} sx={{ px: { xs: 3, md: 6 } }}>
            <Typography
              variant="h2"
              color="text.primary"
              align="center"
              gutterBottom
              sx={{ mb: 6 }}
            >
              Featured Topics
            </Typography>
            <Grid container spacing={3}>
              {featuredTopics.map((topic) => (
                <Grid item xs={12} sm={6} md={4} key={topic.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card sx={{ bgcolor: 'background.default' }}>
                      <CardContent>
                        <Typography variant="h3" color="text.primary" gutterBottom>
                          {topic.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {topic.description}
                        </Typography>
                        <Typography variant="caption" color="primary" sx={{ mt: 2, display: 'block' }}>
                          Grade {topic.grade}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          component={Link}
                          to={`/topics/${topic.id}`}
                          color="primary"
                          sx={{ fontWeight: 500, px: 3 }}
                        >
                          Start Now
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
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

export default HomePage;