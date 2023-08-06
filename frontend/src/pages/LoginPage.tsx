import api from '@/lib/api';
import { createSignal, Show } from 'solid-js';
import Alert from '@/components/util/Alert';
import Button from '@/components/util/Button';
import Title from '@/components/Header/Title';
import CenterContainer from '@/components/util/CenterContainer';
import UsernameInput from '@/components/UsernameInput';
import PasswordInput from '@/components/PasswordInput';

const LoginPage = () => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal(false);

  const login = async () => {
    console.log(username(), password());

    const data = await api.login(username(), password());
    if (data.ok) window.location.href = '/';
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
