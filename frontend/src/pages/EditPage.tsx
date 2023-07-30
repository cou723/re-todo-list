import { useParams } from '@solidjs/router';
import { type Component, createResource } from 'solid-js';
import TaskEditor from '../components/TaskEditor';
import api from '../lib/api';
import { Err, Ok, Result } from 'ts-results';

const EditPage: Component = () => {
  const params = useParams();
  const [task] = createResource(async () => {
    const taskId = parseIntResult(params.id);
    if (taskId.ok) {
      const res = await api.get(taskId.val);
      if (res.err) window.location.href = '/404';
      else
        return {
          title: res.val.title,
          description: res.val.description,
          parent: res.val.path.split('/').slice(0, -1),
        };
    } else window.location.href = '/404';
    return {};
  });
  return (
    <>
      <TaskEditor
        default={{ title: task.title, description: task.val.description }}
        sendLabel="更新"
      />
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
