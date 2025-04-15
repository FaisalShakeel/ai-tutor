import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
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
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
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

const QuizGeneratorPage = () => {
  const [form, setForm] = useState({
    topicId: '',
    type: 'quiz',
    difficulty: 'medium',
  });
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Sample topics (replace with API call)
  const topics = [
    { id: '1', name: 'Fractions Basics', grade: 6 },
    { id: '2', name: 'Linear Equations', grade: 8 },
    { id: '3', name: 'Quadratics', grade: 10 },
  ];

  // Mock quiz data (replace with API call to Grok API)
  const handleGenerate = () => {
    setLoading(true);
    setError(null);
    setSubmitted(false);
    setAnswers({});
    // Simulate API call
    setTimeout(() => {
      const mockQuiz = {
        id: '123',
        topicId: form.topicId,
        type: form.type,
        difficulty: form.difficulty,
        questions: [
          {
            question: 'What is 1/4 + 2/4?',
            answer: '3/4',
            explanation: 'Add the numerators (1 + 2 = 3) and keep the denominator (4). So, 1/4 + 2/4 = 3/4.',
          },
          {
            question: 'Simplify 6/8.',
            answer: '3/4',
            explanation: 'Divide numerator and denominator by their GCD, 2: 6 ÷ 2 = 3, 8 ÷ 2 = 4. So, 6/8 = 3/4.',
          },
        ],
      };
      setQuiz(mockQuiz);
      setLoading(false);
    }, 1000);
  };

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Simulate scoring (replace with API call)
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handlePrint = (withAnswers) => {
    // Placeholder for print functionality (use jsPDF in production)
    alert(`Printing ${withAnswers ? 'with' : 'without'} answers...`);
  };

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
            Generate Practice Quiz
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Customize your math practice session
          </Typography>
        </Box>

        {/* Main Content */}
        <Box sx={{ width: '100%',overflowX:"hidden", py: { xs: 4, md: 6 } }}>
          <Container maxWidth='lg' sx={{ px: { xs: 3, md: 6 }, maxWidth: '1000px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Quiz Form */}
              <Card sx={{ mb: 4, bgcolor: 'background.default' }}>
                <CardContent>
                  <Typography variant="h3" color="text.primary" gutterBottom>
                    Create Your Quiz
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel>Topic</InputLabel>
                        <Select
                          value={form.topicId}
                          label="Topic"
                          onChange={(e) => setForm({ ...form, topicId: e.target.value })}
                        >
                          <MenuItem value="">Select Topic</MenuItem>
                          {topics.map((topic) => (
                            <MenuItem key={topic.id} value={topic.id}>
                              {topic.name} (Grade {topic.grade})
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel>Exam Type</InputLabel>
                        <Select
                          value={form.type}
                          label="Exam Type"
                          onChange={(e) => setForm({ ...form, type: e.target.value })}
                        >
                          <MenuItem value="quiz">Quiz</MenuItem>
                          <MenuItem value="test">Test</MenuItem>
                          <MenuItem value="MAP">MAP</MenuItem>
                          <MenuItem value="UIL">UIL</MenuItem>
                          <MenuItem value="STAAR">STAAR</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel>Difficulty</InputLabel>
                        <Select
                          value={form.difficulty}
                          label="Difficulty"
                          onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                        >
                          <MenuItem value="easy">Easy</MenuItem>
                          <MenuItem value="medium">Medium</MenuItem>
                          <MenuItem value="hard">Hard</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGenerate}
                        disabled={loading || !form.topicId}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Quiz'}
                      </Button>
                    </motion.div>
                  </Box>
                </CardContent>
              </Card>

              {/* Error Display */}
              {error && (
                <Alert severity="error" sx={{ mb: 4 }}>
                  {error}
                </Alert>
              )}

              {/* Quiz Questions */}
              {quiz && (
                <Card sx={{ bgcolor: 'background.default' }}>
                  <CardContent>
                    <Typography variant="h3" color="text.primary" gutterBottom>
                      Your Quiz
                    </Typography>
                    {quiz.questions.map((q, index) => (
                      <Box key={index} sx={{ mb: 3 }}>
                        <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
                          {index + 1}. {q.question}
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="Enter your answer"
                          value={answers[index] || ''}
                          onChange={(e) => handleAnswerChange(index, e.target.value)}
                          disabled={submitted}
                          sx={{ maxWidth: '500px' }}
                        />
                        {submitted && (
                          <Typography
                            variant="body2"
                            color={answers[index]?.toLowerCase() === q.answer.toLowerCase() ? 'primary' : 'error'}
                            sx={{ mt: 1 }}
                          >
                            {answers[index]?.toLowerCase() === q.answer.toLowerCase()
                              ? 'Correct!'
                              : `Incorrect. Answer: ${q.answer}`}
                            <br />
                            {q.explanation}
                          </Typography>
                        )}
                      </Box>
                    ))}
                    {!submitted && quiz.questions.length > 0 && (
                      <Box sx={{ textAlign: 'center', mt: 3 }}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            disabled={loading}
                          >
                            Submit Answers
                          </Button>
                        </motion.div>
                      </Box>
                    )}
                    {submitted && (
                      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3, flexWrap: 'wrap' }}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handlePrint(false)}
                          >
                            Print Without Answers
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handlePrint(true)}
                          >
                            Print With Answers
                          </Button>
                        </motion.div>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              )}
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

export default QuizGeneratorPage;