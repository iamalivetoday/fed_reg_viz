// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DocketsPage from './pages/DocketsPage';
import AgenciesPage from './pages/AgenciesPage';
import Footer from './components/Footer';
import OneDocketPage from './pages/OneDocketPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LayoutWithNoNavbar />} />
        <Route path="/about" element={<LayoutWithNavbar><AboutPage /></LayoutWithNavbar>} />
        <Route path="/dockets/:agencyAcronym" element={<LayoutWithNavbar><DocketsPage /></LayoutWithNavbar>} />
        <Route path="/dockets" element={<LayoutWithNavbar><DocketsPage /></LayoutWithNavbar>} />
        <Route path="/agencies" element={<LayoutWithNavbar><AgenciesPage /></LayoutWithNavbar>} />
        <Route path="/onedocket" element={<LayoutWithNavbar><OneDocketPage /></LayoutWithNavbar>} />
      </Routes>
      <Footer />
    </Router>
  );
};

// Layout without Navbar
const LayoutWithNoNavbar = () => {
  return (
    <>
      <HomePage />
    </>
  );
};

// Layout with Navbar
const LayoutWithNavbar = ({ children }) => {
  const location = useLocation(); // Hook to access the current location

  return (
    <>
      {location.pathname !== "/" && <NavBar />}
      {children}
    </>
  );
};

export default App;