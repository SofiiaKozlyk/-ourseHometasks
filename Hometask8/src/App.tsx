import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import StipePage from './layouts/StipePage';
import LoginPage from './layouts/LoginPage';
import RegisterPage from './layouts/RegisterPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<StipePage />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      {/* <Route
        path="/protected"
        element={
          <ProtectedRoute isAllowed={isAuthenticated}>
            <ProtectedComponent />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
}

export default App;
