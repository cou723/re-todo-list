import { Alert, Button, Form } from 'solid-bootstrap';
import { type Component, Show, createSignal, createResource } from 'solid-js';
import TextInput from '../components/TextInput';
import api from '../lib/api';

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
      <Form>
        <TextInput
          label="Username"
          value={username}
          setValue={setUsername}
          placeholder="UserName10203"
          help={isDuplicateUsername() ? 'ユーザー名が既に使われています。' : ''}
        />
        <TextInput
          label="Password"
          value={password}
          setValue={setPassword}
          type="password"
          placeholder="**********"
        />
        <Show when={error()}>
          <Alert variant="danger" dismissible onClose={() => setError('')}>
            <Alert.Heading>登録失敗</Alert.Heading>
            <p>{error()}</p>
          </Alert>
        </Show>
        <Button
          variant="primary"
          onClick={register}
          disabled={!!isDuplicateUsername()}
        >
          Create New Account
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
