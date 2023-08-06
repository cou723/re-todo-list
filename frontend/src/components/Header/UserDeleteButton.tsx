import { Button } from 'solid-bootstrap';
import api from '@/lib/api';

export const UserDeleteButton = (props: { class: string }) => {
  const deleteAccount = async () => {
    // 今のところ削除が成功したかどうかは確認しない
    /* const res = */ await api.deleteAccount();
    await await api.logout();
    window.location.href = '/login';
  };

  return (
    <Button variant="danger" class={props.class} onClick={deleteAccount}>
      アカウント削除
    </Button>
  );
};
