import { useParams } from '@solidjs/router';
import { type Component, createResource, Show } from 'solid-js';
import TaskEditor from '../components/TaskEditor';
import api from '../lib/api';
import { Err, Ok, Result } from 'ts-results';
import { ICreateTaskDto } from '../../../backend/src/task/createTaskDto';

const EditPage: Component = () => {
  const params = useParams();
  const idResult = parseIntResult(params.id);
  if (idResult.err) {
    window.location.href = '/404';
    throw new Error('404');
  }
  const id = idResult.val;
  const [task] = createResource<ICreateTaskDto>(
    async (): Promise<ICreateTaskDto> => {
      const res = await api.get(id);
      if (res.err) {
        window.location.href = '/';
        throw new Error();
      }
      console.log('res:', res.val);
      if (res.val.path === '')
        return {
          title: res.val.title,
          description: res.val.description,
        };

      return {
        title: res.val.title,
        description: res.val.description,
        parentId: parseInt(res.val.path.split('/').slice(0, -1)[0]),
      };
    },
  );

  const sendEditedTask = async (sendTask: ICreateTaskDto) => {
    const taskId = parseIntResult(params.id);
    if (taskId.err) {
      window.location.href = '/404';
      return [];
    }
    console.log('val;', sendTask);
    await api.update(taskId.val, {
      title: sendTask.title,
      description: sendTask.description,
    });
    if (task() !== undefined && sendTask.parentId != task()?.parentId) {
      if (sendTask.parentId == undefined) await api.deleteParent(taskId.val);
      else await api.addParent(taskId.val, sendTask.parentId);
    }
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
            parentId: task()?.parentId ?? undefined,
          }}
          sendLabel="更新"
          onSend={sendEditedTask}
          id={id}
        />
        {task()?.parentId}
      </Show>
      Task Id: {id}
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
