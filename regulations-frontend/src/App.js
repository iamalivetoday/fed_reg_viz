// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DocketsPage from './pages/DocketsPage';
import OneDocketPage from './pages/OneDocketPage';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dockets" element={<DocketsPage />} />
        <Route path="/onedocket" element={<OneDocketPage/>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
