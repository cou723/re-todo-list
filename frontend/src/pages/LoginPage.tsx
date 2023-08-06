import api from '@/lib/api';
import { createSignal, Show } from 'solid-js';
import TextInput from '@/components/TextInput';
import Alert from '@/components/utils/Alert';
import Button from '@/components/utils/Button';

const LoginPage = () => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal(false);

  const login = async () => {
    const data = await api.login(username(), password());
    if (data.ok) window.location.href = '/';
    else setError(true);
  };

  return (
    <div style={{ width: '20rem' }}>
      <h4>Login</h4>
      <Form>
        <TextInput
          label="Username"
          value={username}
          setValue={setUsername}
          placeholder="UserName10203"
        />
        <TextInput
          label="Password"
          value={password}
          setValue={setPassword}
          type="password"
          placeholder="**********"
        />
        <Show when={error()}>
          <Alert variant="error" onClose={() => setError(false)}>
            ログインに失敗しました。今一度ユーザー名とパスワードを確認してください。
          </Alert>
        </Show>
        <Button onClick={login}>Login</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
