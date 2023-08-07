import { createSignal, type Component, Show } from 'solid-js';
import TaskEditor from '@/components/TaskEditor/TaskEditor';
import api from '@/lib/api';
import { ICreateTaskDto } from '@/../../backend/src/task/createTaskDto';
import Alert from '@/components/util/Alert';
import Title from '@/components/Header/Title';
import CenterContainer from '@/components/util/CenterContainer';

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
    <CenterContainer>
      <Title class="mb-4">タスク作成</Title>
      <Show when={error() != ''}>
        <Alert
          variant="error"
          onClose={() => {
            setError('');
          }}
        >
          {error()}
        </Alert>
      </Show>
      <TaskEditor onSend={createTask} sendLabel="作成" />
    </CenterContainer>
  );
};

export default CreatePage;
