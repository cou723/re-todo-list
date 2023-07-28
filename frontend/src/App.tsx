import type { Component } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePage from './pages/CreatePage';

const App: Component = () => (
  <>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/task/:id" element={<EditPage />} />
      <Route path="/task/create" element={<CreatePage />} />
    </Routes>
  </>
);

export default App;
