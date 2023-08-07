import api from '@/lib/api';
import { IconButton } from '../util/IconButton';

export const LogoutButton = () => {
  const logout = async () => {
    console.log('logout');

    await api.logout();
    window.location.href = '/login';
  };

  return (
    <IconButton
      variant="outline-primary"
      class="me-2 mr-1"
      onClick={logout}
      icon="material-symbols:logout"
    >
      Logout
    </IconButton>
  );
};
