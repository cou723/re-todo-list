import { Show, For, createResource } from 'solid-js';
import { SetStoreFunction } from 'solid-js/store';
import { ICreateTaskDto } from 'common';
import { ITaskView, TaskView } from '@/types/TaskView';
import api from '@/lib/api';
import Select from '../util/Select';

const ParentTaskSelect = (props: {
  currentTask: ICreateTaskDto;
  setTask: SetStoreFunction<ICreateTaskDto>;
  id?: number;
  full?: boolean;
}) => {
  const [parentTaskList] = createResource(true, async () => {
    const data = await api.list();

    let tasks: ITaskView[] = [];

    if (data.ok) tasks = data.val.map((task) => TaskView.fromObject(task));
    else window.location.href = '/login';

    return tasks.filter((task) => task.id != props.id);
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
            <option
              selected={parentTask.id == props.currentTask.parentId}
              value={parentTask.id}
            >
              {parentTask.title}
              {/* :{_task.id == task.parent ? 'ok' : 'no'}:
            {_task.id}:{task.parent} */}
            </option>
          )}
        </For>
        <option
          selected={props.currentTask.parentId === undefined}
          value={undefined}
        >
          なし
        </option>
      </Show>
    </Select>
  );
};

export default ParentTaskSelect;
