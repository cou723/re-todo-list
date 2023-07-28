import { Button, Form } from 'solid-bootstrap';
import api from '../lib/api';
import { createSignal } from 'solid-js';
import TextInput from '../components/TextInput';

const LoginPage = () => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const login = async () => {
    try {
      const data = await api.login(username(), password());
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div style={{ width: '20rem' }}>
      <h4>Login</h4>
      <Form>
        <TextInput label="Username" value={username} setValue={setUsername} />
        <TextInput
          label="password"
          value={password}
          setValue={setPassword}
          type="password"
        />
        <Button variant="primary" onClick={login}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
