import api from '@/lib/api';
import { createSignal, Show } from 'solid-js';
import TextInput from '@/components/utils/TextInput';
import Alert from '@/components/utils/Alert';
import Button from '@/components/utils/Button';

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
    <div class="">
      <h4>Login</h4>
      <div class="flex flex-row">
        <TextInput
          label="Username"
          accessor={username}
          setter={setUsername}
          placeholder="UserName10203"
        />
        <TextInput
          label="Password"
          accessor={password}
          setter={setPassword}
          type="password"
          placeholder="**********"
        />
        <Show when={error()}>
          <Alert variant="error" onClose={() => setError(false)}>
            ログインに失敗しました。今一度ユーザー名とパスワードを確認してください。
          </Alert>
        </Show>
        <Button onClick={login}>Login</Button>
      </div>
    </div>
  );
};

export default LoginPage;
