import api from '@/lib/api';
import Button from '../util/Button';

export const LogoutButton = () => {
  const logout = async () => await api.logout();

  return (
    <Button
      href="/login"
      variant="outline-primary"
      class="me-2 mr-1"
      onClick={logout}
    >
      Logout
    </Button>
  );
};
