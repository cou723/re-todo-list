import { Routes, Route } from '@solidjs/router';
import { createSignal, type Component, createResource, createEffect, onMount } from 'solid-js';

import Header from './components/Header/Header';
import { RouteGuard } from './components/RouteGuard';
import ComponentPlayground from './pages/ComponentPlayground';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import api from './lib/api';

const App: Component = () => {
  const [username, setUsername] = createSignal<string | undefined>(undefined);
  onMount(async () => {
    const res = await api.authStatus();
    if (res.ok) {setUsername(res.val);return res.val;}
    setUsername(undefined);
    return undefined;
  });


  return (
    <>
      <Header username={username} setUsername={setUsername} />
      <div class="container mt-3 mx-auto px-10">
        <Routes>
          <RouteGuard>
            <Route path="/test" element={<ComponentPlayground />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="/task/create" element={<CreatePage />} />
          </RouteGuard>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/404" element={<div>404</div>} />
          <Route path="/login" element={<LoginPage setUsername={setUsername}/>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
