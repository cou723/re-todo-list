import { IconButton } from '../util/IconButton';

import api from '@/lib/api';

export const LogoutButton = () => {
  const logout = async () => {
    await api.logout();
    window.location.href = '/login';
  };

  return (
    <IconButton variant="outline-primary" class="" onClick={logout} icon="material-symbols:logout">
      Logout
    </IconButton>
  );
};
