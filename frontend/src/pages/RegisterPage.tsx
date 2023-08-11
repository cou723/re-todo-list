import { type Component, Show, createSignal, createResource } from 'solid-js';
import api from '@/lib/api';
import Button from '@/components/util/Button';
import Alert from '@/components/util/Alert';
import Title from '@/components/Header/Title';
import CenterContainer from '@/components/util/CenterContainer';
import UsernameInput from '@/components/UsernameInput';
import PasswordInput from '@/components/PasswordInput';

const RegisterPage: Component = () => {
  const [username, setUsername] = createSignal<string>('');
  const [password, setPassword] = createSignal<string>('');
  const [error, setError] = createSignal<string>('');

  const register = async () => {
    const res = await api.register(username(), password());
    if (res.err) {
      if (res.val.statusCode === 409) setError('ユーザー名が既に使われています。');
      if (res.val.statusCode === 400) setError('ユーザー名またはpasswordが空です');
    } else window.location.href = '/login';
  };

  const [isDuplicateUsername] = createResource(username, async () => {
    const res = await api.isUserExist(username());
    if (res.ok) return res.val;
    return false;
  });

  return (
    <CenterContainer>
      <Title class="mb-4">Register</Title>
      <div class="flex flex-col gap-4">
        <UsernameInput
          value={username}
          setValue={setUsername}
          isDuplicateUsername={isDuplicateUsername()}
        />
        <PasswordInput accessor={password} setter={setPassword} />
        <Show when={error()}>
          <Alert variant="error" onClose={() => setError('')}>
            <p>{error()}</p>
          </Alert>
        </Show>
        <Button onClick={register} disabled={isDuplicateUsername()}>
          アカウント新規作成
        </Button>
      </div>
    </CenterContainer>
  );
};

export default RegisterPage;
