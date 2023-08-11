import { useNavigate, useParams } from '@solidjs/router';
import { ICreateTaskDto } from 'common';
import { type Component, createResource, Show } from 'solid-js';
import { Err, Ok, Result } from 'ts-results';

import Title from '@/components/Header/Title';
import TaskEditor from '@/components/TaskEditor/TaskEditor';
import CenterContainer from '@/components/util/CenterContainer';
import api from '@/lib/api';

const EditPage: Component = () => {
  const navigate = useNavigate();

  const params = useParams();

  const [task] = createResource<ICreateTaskDto>(async (): Promise<ICreateTaskDto> => {
    const idResult = parseIntResult(params.id);

    if (idResult.err) {
      navigate('/404');
      throw new Error('404');
    }

    const targetId = idResult.val;
    const res = await api.get(targetId);
    if (res.err) {
      navigate('/');
      throw new Error();
    }

    if (res.val.path === '')
      return {
        description: res.val.description,
        title: res.val.title,
      };

    return {
      description: res.val.description,
      parentId: parseInt(res.val.path.split('/').slice(0, -1)[0]),
      title: res.val.title,
    };
  });

  const sendEditedTask = async (sendTask: ICreateTaskDto) => {
    const taskId = parseIntResult(params.id);
    if (taskId.err) {
      navigate('/404');
      return [];
    }
    console.log('val;', sendTask);
    await api.update(taskId.val, {
      description: sendTask.description,
      title: sendTask.title,
    });
    if (task() !== undefined && sendTask.parentId != task()?.parentId) {
      if (sendTask.parentId == undefined) await api.deleteParent(taskId.val);
      else await api.addParent(taskId.val, sendTask.parentId);
    }
    navigate('/');
  };

  return (
    <CenterContainer>
      <Title class="mb-4">タスクを編集</Title>
      <Show when={!!task()} fallback={<>タスクの取得に失敗しました。リロードしてください。</>}>
        <TaskEditor
          default={{
            description: task()?.description ?? '',
            parentId: task()?.parentId ?? undefined,
            title: task()?.title ?? '',
          }}
          sendLabel="更新"
          onSend={sendEditedTask}
        />
      </Show>
    </CenterContainer>
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
