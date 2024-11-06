import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import StipePage from './layouts/StipePage';
import LoginPage from './layouts/LoginPage';
import RegisterPage from './layouts/RegisterPage';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { initializeUserState } from './store/slices/userSlice';
import ControlBar from './components/ControlBar';
import NewPost from './layouts/NewPost';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeUserState());
  }, [dispatch]);

  return (
    <>
      <ControlBar isAuthenticated={isAuthenticated} />
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
    </>
  );
}

export default App;
