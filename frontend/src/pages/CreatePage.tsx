import { createSignal, type Component, Show } from 'solid-js';
import TaskEditor from '../components/TaskEditor';
import api from '../lib/api';
import { ICreateTaskDto } from '../../../backend/src/task/createTaskDto';
import { Alert } from 'solid-bootstrap';

const CreatePage: Component = () => {
  const [error, setError] = createSignal<string>('');

  const createTask = async (task: ICreateTaskDto) => {
    console.log(task);

    const res = await api.create(task);
    if (res.err) {
      if (res.val.statusCode === 401) window.location.href = '/login';
      else setError('タスクの作成に失敗しました');
      return;
    }
    window.location.href = '/';
  };

  return (
    <>
      <Show when={error() != ''}>
        <Alert
          variant="danger"
          dismissible
          onClose={() => {
            setError('');
          }}
        >
          {error()}
        </Alert>
      </Show>
      <TaskEditor onSend={createTask} sendLabel="作成" />
    </>
  );
};

export default CreatePage;
