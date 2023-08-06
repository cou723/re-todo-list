import { type Component, Show, createSignal, createResource } from 'solid-js';
import TextInput from '@/components/utils/TextInput';
import api from '@/lib/api';
import Button from '@/components/utils/Button';
import Alert from '@/components/utils/Alert';

const RegisterPage: Component = () => {
  const [username, setUsername] = createSignal<string>('');
  const [password, setPassword] = createSignal<string>('');
  const [error, setError] = createSignal<string>('');

  const register = async () => {
    const res = await api.register(username(), password());
    if (res.err) {
      setError('ユーザー名が既に使われています。');
    } else window.location.href = '/login';
  };

  const [isDuplicateUsername] = createResource(username, async () => {
    const res = await api.isUserExist(username());
    if (res.ok) return res.val;
    else return false;
  });

  return (
    <div style={{ width: '20rem' }}>
      <h4>Register</h4>
      <form>
        <TextInput
          label="Username"
          accessor={username}
          setter={setUsername}
          placeholder="UserName10203"
          error={
            isDuplicateUsername() ? 'ユーザー名が既に使われています。' : ''
          }
        />
        <TextInput
          label="Password"
          accessor={password}
          setter={setPassword}
          type="password"
          placeholder="**********"
        />
        <Show when={error()}>
          <Alert variant="error" onClose={() => setError('')}>
            <p>{error()}</p>
          </Alert>
        </Show>
        <Button onClick={register} disabled={!!isDuplicateUsername()}>
          アカウント新規作成
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
