import { useNavigate } from '@solidjs/router';

import { IconButton } from '../util/IconButton';

import api from '@/lib/api';

export const LogoutButton = (props: { refetch: () => void }) => {
  const navigate = useNavigate();
  const logout = async () => {
    props.refetch();
    await api.logout();
    navigate('/login');
  };

  return (
    <IconButton variant="outline-primary" class="" onClick={logout} icon="material-symbols:logout">
      Logout
    </IconButton>
  );
};
