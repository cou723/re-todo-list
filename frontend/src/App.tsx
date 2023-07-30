import { type Component } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import EditPage from './pages/EditPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import Header from './components/Header';

const App: Component = () => (
  <>
    <Header />
    <div class="container mt-4">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/task/:id" element={<EditPage />} />
        <Route path="/task/create" element={<CreatePage />} />
      </Routes>
    </div>
  </>
);

export default App;
