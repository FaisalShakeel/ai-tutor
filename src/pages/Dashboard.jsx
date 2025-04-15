import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Typography, 
  Button, 
  LinearProgress, 
  Avatar, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  ListItemSecondaryAction, 
  Chip, 
  TextField, 
  IconButton, 
  Paper, 
  Divider,
  CircularProgress
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// Mock data for the dashboard
const progressData = [
  { name: 'Mon', score: 65 },
  { name: 'Tue', score: 72 },
  { name: 'Wed', score: 68 },
  { name: 'Thu', score: 85 },
  { name: 'Fri', score: 82 },
  { name: 'Sat', score: 90 },
  { name: 'Sun', score: 88 },
];

const recentActivities = [
  { id: 1, topic: 'Linear Equations', type: 'Practice', score: '85%', date: '2 hours ago' },
  { id: 2, topic: 'Fractions', type: 'Quiz', score: '90%', date: 'Yesterday' },
  { id: 3, topic: 'Decimals', type: 'Practice', score: '75%', date: '2 days ago' },
  { id: 4, topic: 'Geometry Basics', type: 'Test', score: '92%', date: '3 days ago' },
];

const recommendedTopics = [
  { id: 1, name: 'Quadratic Equations', strand: 'Algebra', progress: 15, difficulty: 'Medium' },
  { id: 2, name: 'Circle Theorems', strand: 'Geometry', progress: 0, difficulty: 'Hard' },
  { id: 3, name: 'Data Analysis', strand: 'Statistics', progress: 5, difficulty: 'Medium' },
];

// Custom theme with light green and white
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E8F5E9',
      light: '#F1F8E9',
      dark: '#C8E6C9',
      contrastText: '#212121',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Velyra", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

// Difficulty chip color mapping
const getDifficultyChipProps = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return { color: 'success', sx: { backgroundColor: '#E8F5E9', color: '#388E3C' } };
    case 'Medium':
      return { color: 'warning', sx: { backgroundColor: '#FFF8E1', color: '#F57C00' } };
    case 'Hard':
      return { color: 'error', sx: { backgroundColor: '#FFEBEE', color: '#D32F2F' } };
    default:
      return { color: 'default' };
  }
};

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    let newGreeting = '';
    
    if (hour < 12) newGreeting = 'Good Morning';
    else if (hour < 18) newGreeting = 'Good Afternoon';
    else newGreeting = 'Good Evening';
    
    setGreeting(newGreeting);
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="background.default"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        fontFamily: '"Velyra", sans-serif'
      }}>
        {/* Header */}
        <Box
          sx={{
            py: 4,
            px: 3,
            mb: 4,
            background: 'linear-gradient(145deg, #4CAF50 30%, #81C784 90%)',
            color: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {greeting}, Alex!
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 0.5 }}>
              Ready to continue your math journey?
            </Typography>
          </Container>
        </Box>
        
        {/* Main Content */}
        <Container maxWidth="lg">
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ borderLeft: '4px solid #4CAF50', height: '100%' }}>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Current Grade
                  </Typography>
                  <Typography variant="h3" color="text.primary" sx={{ mb: 2 }}>
                    Grade 8
                  </Typography>
                  <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
                    Making good progress
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ borderLeft: '4px solid #9C27B0', height: '100%' }}>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Completed Topics
                  </Typography>
                  <Typography variant="h3" color="text.primary" sx={{ mb: 2 }}>
                    12 of 48
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={25} 
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      backgroundColor: '#EDE7F6',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#9C27B0'
                      }
                    }} 
                  />
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ borderLeft: '4px solid #2196F3', height: '100%' }}>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">
                    Weekly Study
                  </Typography>
                  <Typography variant="h3" color="text.primary" sx={{ mb: 2 }}>
                    5.2 hours
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#2196F3', fontWeight: 500 }}>
                    2.1 hours more than last week
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* Progress Chart & Activity */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Weekly Progress */}
            <Grid item xs={12} lg={8}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" color="text.primary" sx={{ mb: 3 }}>
                    Weekly Progress
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={progressData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                        <XAxis dataKey="name" stroke="#9e9e9e" />
                        <YAxis stroke="#9e9e9e" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: 'none', 
                            borderRadius: 8,
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' 
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#4CAF50" 
                          strokeWidth={3} 
                          dot={{ r: 6, fill: '#4CAF50', strokeWidth: 0 }}
                          activeDot={{ r: 8, fill: '#4CAF50', strokeWidth: 0 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Recent Activity */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                    Recent Activity
                  </Typography>
                  <List sx={{ px: 0 }}>
                    {recentActivities.map((activity) => (
                      <ListItem key={activity.id} sx={{ 
                        px: 2, 
                        py: 1.5, 
                        borderRadius: 2, 
                        mb: 1,
                        '&:hover': { bgcolor: '#F1F8E9' },
                        transition: 'background-color 0.2s ease'
                      }}>
                        <ListItemAvatar>
                          <Avatar sx={{ 
                            bgcolor: '#E8F5E9', 
                            color: '#4CAF50',
                            fontWeight: 500
                          }}>
                            {activity.type === 'Quiz' ? 'Q' : activity.type === 'Test' ? 'T' : 'P'}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={activity.topic} 
                          secondary={`${activity.type} • ${activity.date}`}
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                        <ListItemSecondaryAction>
                          <Chip 
                            label={activity.score} 
                            size="small" 
                            sx={{ 
                              bgcolor: '#E8F5E9', 
                              color: '#388E3C',
                              fontWeight: 500
                            }} 
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions>
                  <Button 
                    fullWidth 
                    color="primary" 
                    endIcon={<MoreHorizIcon />}
                  >
                    View All Activity
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          
          {/* Recommended Topics & Chat */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Recommended Topics */}
            <Grid item xs={12} lg={7}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="text.primary" sx={{ mb: 3 }}>
                    Recommended Topics
                  </Typography>
                  <Grid container spacing={2}>
                    {recommendedTopics.map((topic) => (
                      <Grid item xs={12} sm={6} key={topic.id}>
                        <Paper 
                          elevation={0} 
                          sx={{ 
                            p: 2, 
                            border: '1px solid #e0e0e0', 
                            borderRadius: 2,
                            transition: 'border-color 0.2s ease',
                            '&:hover': { borderColor: '#81C784' },
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="subtitle1" fontWeight={500}>
                              {topic.name}
                            </Typography>
                            <Chip 
                              label={topic.difficulty} 
                              size="small" 
                              {...getDifficultyChipProps(topic.difficulty)}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {topic.strand}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ flexGrow: 1, mr: 2 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={topic.progress} 
                                sx={{ 
                                  height: 6, 
                                  borderRadius: 3,
                                }} 
                              />
                            </Box>
                            <Button 
                              variant="contained" 
                              color="primary" 
                              size="small"
                            >
                              Start
                            </Button>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="outlined" color="primary">
                    Explore All Topics
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
            {/* AI Chat */}
            <Grid item xs={12} lg={5}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                    Math AI Tutor
                  </Typography>
                  <Box 
                    sx={{ 
                      bgcolor: '#FAFAFA', 
                      borderRadius: 2, 
                      p: 2, 
                      mb: 2, 
                      height: '300px',
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1.5
                    }}
                  >
                    <Box sx={{ alignSelf: 'flex-start', maxWidth: '75%' }}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          bgcolor: '#E8F5E9', 
                          borderRadius: 2,
                          borderTopLeftRadius: 0,
                        }}
                      >
                        <Typography variant="body2">
                          Hello! I'm your AI math tutor. Need help with any problems today?
                        </Typography>
                      </Paper>
                    </Box>
                    
                    <Box sx={{ alignSelf: 'flex-end', maxWidth: '75%' }}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          bgcolor: 'white', 
                          borderRadius: 2,
                          borderTopRightRadius: 0,
                          border: '1px solid #e0e0e0',
                        }}
                      >
                        <Typography variant="body2">
                          I'm stuck on quadratic equations
                        </Typography>
                      </Paper>
                    </Box>
                    
                    <Box sx={{ alignSelf: 'flex-start', maxWidth: '75%' }}>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          bgcolor: '#E8F5E9', 
                          borderRadius: 2,
                          borderTopLeftRadius: 0,
                        }}
                      >
                        <Typography variant="body2">
                          I can help with that! Would you like to start with the concept or practice a specific problem?
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField 
                      fullWidth 
                      placeholder="Ask your math question..." 
                      size="small"
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                    <IconButton 
                      color="primary" 
                      sx={{ 
                        bgcolor: '#4CAF50', 
                        color: 'white',
                        '&:hover': {
                          bgcolor: '#388E3C',
                        },
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        
        {/* Footer */}
        <Box 
          component="footer" 
          sx={{ 
            py: 3, 
            px: 2, 
            mt: 'auto', 
            bgcolor: '#F1F8E9',
            borderTop: '1px solid #E8F5E9',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">
                  © 2025 Math Learning Platform
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
                  <Button color="inherit" size="small">Practice Generator</Button>
                  <Button color="inherit" size="small">Help Center</Button>
                  <Button color="inherit" size="small">Settings</Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;