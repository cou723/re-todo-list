import { useNavigate } from '@solidjs/router';
import { createSignal, Show } from 'solid-js';

import Title from '@/components/Header/Title';
import PasswordInput from '@/components/PasswordInput';
import UsernameInput from '@/components/UsernameInput';
import Alert from '@/components/util/Alert';
import Button from '@/components/util/Button';
import CenterContainer from '@/components/util/CenterContainer';
import api from '@/lib/api';

const LoginPage = () => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal(false);

  const navigate = useNavigate();

  const login = async () => {
    const data = await api.login(username(), password());
    if (data.ok) navigate('/');
    else setError(true);
  };

  return (
    <CenterContainer>
      <Title class="mb-4">Login</Title>
      <div class="flex flex-col gap-4">
        <UsernameInput value={username} setValue={setUsername} />
        <PasswordInput accessor={password} setter={setPassword} />
        <Show when={error()}>
          <Alert variant="error" onClose={() => setError(false)}>
            ログインに失敗しました。今一度ユーザー名とパスワードを確認してください。
          </Alert>
        </Show>
        <Button onClick={login}>Login</Button>
      </div>
    </CenterContainer>
  );
};

export default LoginPage;
