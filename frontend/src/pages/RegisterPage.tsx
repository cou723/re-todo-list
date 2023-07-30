import { Alert, Button, Form } from 'solid-bootstrap';
import { type Component, Show, createSignal } from 'solid-js';
import TextInput from '../components/TextInput';
import api from '../lib/api';

const RegisterPage: Component = () => {
  const [username, setUsername] = createSignal<string>('');
  const [password, setPassword] = createSignal<string>('');
  const [error, setError] = createSignal<string>('');

  const register = async () => {
    const res = await api.register(username(), password());
    if (res.err) {
      // ユーザー名被り
      // ユーザー名入力してない
    } else window.location.href = '/login';
  };

  return (
    <div style={{ width: '20rem' }}>
      <h4>Register</h4>
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
          <Alert variant="danger" dismissible onClose={() => setError('')}>
            <Alert.Heading>ログイン失敗</Alert.Heading>
            <p>
              ログインに失敗しました。今一度ユーザー名とパスワードを確認してください。
            </p>
          </Alert>
        </Show>
        <Button variant="primary" onClick={register}>
          Create New Account
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
