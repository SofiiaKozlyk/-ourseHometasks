import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import StipePage from './layouts/StipePage';
import LoginPage from './layouts/LoginPage';
import RegisterPage from './layouts/RegisterPage';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import ControlBar from './components/ControlBar';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  // console.log(isAuthenticated);

  return (
    <>
      <ControlBar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<StipePage />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute isAllowed={!isAuthenticated}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute isAllowed={!isAuthenticated}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-posts"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <StipePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-post"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <StipePage />
            </ProtectedRoute>
          }
        />
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
    </>
  );
}

export default App;
