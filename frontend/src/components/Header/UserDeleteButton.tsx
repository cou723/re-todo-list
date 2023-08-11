import { useNavigate } from '@solidjs/router';

import Button from '../util/Button';

import api from '@/lib/api';

export const UserDeleteButton = (props: { class?: string }) => {
  const navigate = useNavigate();

  const deleteAccount = async () => {
    // 今のところ削除が成功したかどうかは確認しない
    /* const res = */ await api.deleteAccount();
    await await api.logout();
    navigate('/login');
  };

  return (
    <Button variant="danger" class={props.class ?? ''} onClick={deleteAccount}>
      アカウント削除
    </Button>
  );
};
