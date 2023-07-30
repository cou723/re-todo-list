import { useParams } from '@solidjs/router';
import { type Component, createResource, Show } from 'solid-js';
import TaskEditor from '../components/TaskEditor';
import api from '../lib/api';
import { Err, Ok, Result } from 'ts-results';
import { ICreateTaskDto } from '../../../backend/src/task/createTaskDto';

const EditPage: Component = () => {
  const params = useParams();
  const [task] = createResource(true, async () => {
    const taskId = parseIntResult(params.id);
    if (taskId.err) {
      window.location.href = '/404';
      throw new Error('404');
    }
    const res = await api.get(taskId.val);
    if (res.err) {
      window.location.href = '/';
      throw new Error();
    }
    return {
      title: res.val.title,
      description: res.val.description,
      parent: parseIntResult(res.val.path.split('/').slice(0, -1)[0]).unwrap(),
    };
  });

  const handleSendEditedTask = (task: ICreateTaskDto) => {
    const taskId = parseIntResult(params.id);
    if (taskId.err) {
      window.location.href = '/404';
      throw new Error('404');
    }
    api.update(taskId.val, {
      title: task.title,
      description: task.description,
      parent: task.parent,
    });
    window.location.href = '/';
  };

  return (
    <>
      <h4>タスクを編集</h4>
      <Show when={!!task()} fallback={<>now loading</>}>
        <TaskEditor
          default={{
            title: task()?.title ?? '',
            description: task()?.description ?? '',
            parent: task()?.parent ?? undefined,
          }}
          sendLabel="更新"
          onSend={handleSendEditedTask}
        />
      </Show>
      Task Id: {params.id}
    </>
  );
};

function parseIntResult(id: string): Result<number, void> {
  try {
    const result = parseInt(id);
    return Ok(result);
  } catch (e) {
    return Err(undefined);
  }
}

export default EditPage;
