import { useSearchParams } from '@solidjs/router';
import { ICreateTaskDto } from 'common';
import { Show, For, createResource } from 'solid-js';
import { SetStoreFunction } from 'solid-js/store';

import Select from '../util/Select';

import api from '@/lib/api';
import { ITaskView, TaskView } from '@/types/TaskView';

const ParentTaskSelect = (props: {
  currentTask: ICreateTaskDto;
  full?: boolean;
  setTask: SetStoreFunction<ICreateTaskDto>;
}) => {
  const [searchParams] = useSearchParams();

  const [parentTaskList] = createResource(true, async () => {
    const data = await api.list();

    let tasks: ITaskView[] = [];

    if (data.ok) tasks = data.val.map((task) => TaskView.fromObject(task));

    if (searchParams['children'] === undefined) return tasks;
    return tasks.filter(
      (task) => !searchParams['children'].split(',').includes(task.id.toString()),
    );
  });

  return (
    <Select
      label="親タスク"
      setter={(value: string) =>
        props.setTask({
          ...props.currentTask,
          parentId: value == 'undefined' ? undefined : parseInt(value),
        })
      }
      class={`${props.full ? 'w-full' : ''}`}
    >
      <Show when={parentTaskList()}>
        <For each={parentTaskList()}>
          {(parentTask) => (
            <option selected={parentTask.id == props.currentTask.parentId} value={parentTask.id}>
              {parentTask.title}
              {/* :{_task.id == task.parent ? 'ok' : 'no'}:
            {_task.id}:{task.parent} */}
            </option>
          )}
        </For>
        <option selected={!props.currentTask.parentId} value={undefined}>
          なし
        </option>
      </Show>
    </Select>
  );
};

export default ParentTaskSelect;
