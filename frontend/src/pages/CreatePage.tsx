import { useNavigate } from '@solidjs/router';
import { ICreateTaskDto } from 'common';
import { createSignal, type Component, Show } from 'solid-js';

import Title from '@/components/Header/Title';
import TaskEditor from '@/components/TaskEditor/TaskEditor';
import Alert from '@/components/util/Alert';
import CenterContainer from '@/components/util/CenterContainer';
import api from '@/lib/api';

const CreatePage: Component = () => {
  const [error, setError] = createSignal<string>('');

  const navigate = useNavigate();

  const createTask = async (task: ICreateTaskDto) => {
    console.log(task);

    const res = await api.create(task);
    if (res.err) {
      if (res.val.statusCode === 401) navigate('/login');
      else setError('タスクの作成に失敗しました');
      return;
    }
    navigate('/');
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
