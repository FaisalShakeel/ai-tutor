import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  Container,
  Divider,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';

// Create a custom theme with Velyra font and light green colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Medium green
      light: '#81c784', // Light green
      dark: '#388e3c', // Dark green
    },
    background: {
      default: '#ffffff', // White background
      paper: '#ffffff',   // White paper/card background
    },
  },
  typography: {
    fontFamily: 'Velyra, Arial, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Velyra';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          /* You would need to add the actual font sources here */
        }
      `,
    },
  },
});

// Sample data structure for topics by grade level
const topicsByGrade = {
  6: [
    { id: '6-1', name: 'Ratios and Proportional Relationships', subtopics: [
      { id: '6-1-1', name: 'Understand ratio concepts' },
      { id: '6-1-2', name: 'Use ratio reasoning to solve problems' }
    ]},
    { id: '6-2', name: 'The Number System', subtopics: [
      { id: '6-2-1', name: 'Divide fractions by fractions' },
      { id: '6-2-2', name: 'Compute with multi-digit numbers' },
      { id: '6-2-3', name: 'Find common factors and multiples' }
    ]},
    { id: '6-3', name: 'Expressions and Equations', subtopics: [
      { id: '6-3-1', name: 'Apply properties of operations' },
      { id: '6-3-2', name: 'Solve one-variable equations and inequalities' }
    ]},
  ],
  7: [
    { id: '7-1', name: 'Ratios and Proportional Relationships', subtopics: [
      { id: '7-1-1', name: 'Analyze proportional relationships' },
      { id: '7-1-2', name: 'Solve percent problems' }
    ]},
    { id: '7-2', name: 'The Number System', subtopics: [
      { id: '7-2-1', name: 'Apply operations with fractions' },
      { id: '7-2-2', name: 'Convert rational numbers to decimals' }
    ]},
  ],
  8: [
    { id: '8-1', name: 'Expressions and Equations', subtopics: [
      { id: '8-1-1', name: 'Work with radicals and integer exponents' },
      { id: '8-1-2', name: 'Understand connections between proportional relationships, lines, and linear equations' }
    ]},
    { id: '8-2', name: 'Functions', subtopics: [
      { id: '8-2-1', name: 'Define, evaluate, and compare functions' },
      { id: '8-2-2', name: 'Use functions to model relationships' }
    ]},
  ],
  9: [
    { id: '9-1', name: 'Algebra I', subtopics: [
      { id: '9-1-1', name: 'Solving linear equations' },
      { id: '9-1-2', name: 'Working with quadratic functions' }
    ]},
  ],
  10: [
    { id: '10-1', name: 'Geometry', subtopics: [
      { id: '10-1-1', name: 'Congruence and similarity' },
      { id: '10-1-2', name: 'Right triangles and trigonometry' }
    ]},
  ],
  11: [
    { id: '11-1', name: 'Algebra II', subtopics: [
      { id: '11-1-1', name: 'Polynomial and rational functions' },
      { id: '11-1-2', name: 'Exponential and logarithmic functions' }
    ]},
  ],
  12: [
    { id: '12-1', name: 'Pre-Calculus', subtopics: [
      { id: '12-1-1', name: 'Trigonometric functions' },
      { id: '12-1-2', name: 'Limits and derivatives introduction' }
    ]},
  ]
};

const TopicsPage = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleTopicClick = (gradeId, topicId, subtopicId) => {
    // Navigate to the selected topic
    navigate(`/practice/${gradeId}/${topicId}/${subtopicId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" 
            sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
            Mathematics Curriculum
          </Typography>
          <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 4, color: 'primary.main' }}>
            Choose a grade level and topic to start learning
          </Typography>

          {Object.keys(topicsByGrade).map((grade) => (
            <Accordion 
              key={grade} 
              expanded={expanded === `grade-${grade}`} 
              onChange={handleChange(`grade-${grade}`)}
              sx={{ 
                mb: 2, 
                border: '1px solid',
                borderColor: 'primary.light',
                '&:before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                aria-controls={`grade${grade}-content`}
                id={`grade${grade}-header`}
                sx={{ 
                  backgroundColor: 'primary.light', 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SchoolIcon sx={{ mr: 2 }} />
                  <Typography variant="h6">Grade {grade}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0, backgroundColor: '#f9fff9' }}>
                <Grid container spacing={2} sx={{ p: 2 }}>
                  {topicsByGrade[grade].map((topic) => (
                    <Grid item xs={12} md={6} key={topic.id}>
                      <Card variant="outlined" sx={{ 
                        height: '100%', 
                        borderColor: 'primary.light',
                        '&:hover': {
                          boxShadow: 2,
                        }
                      }}>
                        <CardContent>
                          <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.dark' }}>
                            {topic.name}
                          </Typography>
                          <Divider sx={{ my: 1, backgroundColor: 'primary.light' }} />
                          <List dense>
                            {topic.subtopics.map((subtopic) => (
                              <ListItem key={subtopic.id} disablePadding>
                                <ListItemButton 
                                  onClick={() => handleTopicClick(grade, topic.id, subtopic.id)}
                                  sx={{ 
                                    borderRadius: 1,
                                    mb: 0.5,
                                    '&:hover': { 
                                      backgroundColor: 'primary.light',
                                      color: 'white' 
                                    }
                                  }}
                                >
                                  <ListItemText primary={subtopic.name} />
                                  <Chip 
                                    label="Practice" 
                                    size="small" 
                                    color="primary" 
                                    variant="outlined"
                                    sx={{ 
                                      borderColor: 'primary.main',
                                      color: 'primary.main',
                                      '&:hover': {
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                      }
                                    }}
                                  />
                                </ListItemButton>
                              </ListItem>
                            ))}
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default TopicsPage;