import { useNavigate } from '@solidjs/router';
import { createSignal, Setter, Show } from 'solid-js';

import Title from '@/components/Header/Title';
import PasswordInput from '@/components/PasswordInput';
import UsernameInput from '@/components/UsernameInput';
import Alert from '@/components/util/Alert';
import Button from '@/components/util/Button';
import CenterContainer from '@/components/util/CenterContainer';
import api from '@/lib/api';

const LoginPage = (props: { setUsername: Setter<string | undefined> }) => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [isError, setIsError] = createSignal(false);

  const navigate = useNavigate();

  const login = async () => {
    const data = await api.login(username(), password());
    if (data.ok) { props.setUsername(username()); navigate('/'); }
    else { props.setUsername(undefined); setIsError(true); }
  };

  return (
    <CenterContainer>
      <Title class="mb-4">Login</Title>
      <div class="flex flex-col gap-4">
        <UsernameInput value={username} setValue={setUsername} />
        <PasswordInput accessor={password} setter={setPassword} />
        <Show when={isError()}>
          <Alert variant="error" onClose={() => setIsError(false)}>
            ログインに失敗しました。今一度ユーザー名とパスワードを確認してください。
          </Alert>
        </Show>
        <Button onClick={login}>Login</Button>
      </div>
    </CenterContainer>
  );
};

export default LoginPage;
