import { type Component } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import EditPage from './pages/EditPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import Header from './components/Header/Header';
import ComponentPlayground from './pages/ComponentPlayground';

const App: Component = () => (
  <>
    <Header />
    <div class="container mx-auto px-10">
      <Routes>
        <Route path="/404" element={<div>404</div>} />
        <Route path="/test" element={<ComponentPlayground />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/task/create" element={<CreatePage />} />
      </Routes>
    </div>
  </>
);

export default App;
