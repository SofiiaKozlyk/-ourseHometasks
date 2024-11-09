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
import NewPost from './layouts/NewPost';
import Notification from './components/Notification';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  return (
    <>
      <ControlBar isAuthenticated={isAuthenticated} />
      <Notification>
        <Routes>
          <Route path="/" element={<StipePage filter="" />} />
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
                <StipePage filter="my-posts" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-post"
            element={
              <ProtectedRoute isAllowed={isAuthenticated}>
                <NewPost />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Notification>
    </>
  );
}

export default App;
