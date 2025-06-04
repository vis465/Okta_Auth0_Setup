import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Profile from './components/profile';
import Navbar from './components/navbar';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
     <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
  );
}

export default App;
