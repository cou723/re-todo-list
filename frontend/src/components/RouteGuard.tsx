import { useNavigate } from '@solidjs/router';
import { JSXElement, createResource } from 'solid-js';

import api from '../lib/api';

export const RouteGuard = (props: { children: JSXElement }) => {
  const navigate = useNavigate();
  const isAuthenticated = createResource(true, async () => {
    return await api.authStatus();
  });

  if (!isAuthenticated) {
    navigate('/login');
  }

  return <>{props.children}</>;
};
