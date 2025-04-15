import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import TopicsPage from './pages/Topics';
import TopicDetailsPage from './pages/TopicDetails';
import QuizGeneratorPage from './pages/QuizGenerator';
import ChatbotTutorPage from './pages/ChatbotTutor';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path="/topics" element={<TopicsPage />} />
        <Route path='/topic-detail/:id' element={<TopicDetailsPage/>}></Route>
        <Route path='/quiz' element={<QuizGeneratorPage/>}></Route>
        <Route path='/chatbot' element={<ChatbotTutorPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;