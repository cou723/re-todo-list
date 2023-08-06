import { Show, For, createResource } from 'solid-js';
import { SetStoreFunction } from 'solid-js/store';
import { ICreateTaskDto } from '@/../../backend/src/task/createTaskDto';
import { ITaskView, TaskView } from '@/types/TaskView';
import api from '@/lib/api';

const ParentTaskSelect = (props: {
  currentTask: ICreateTaskDto;
  setTask: SetStoreFunction<ICreateTaskDto>;
  id?: number;
}) => {
  const [parentTaskList] = createResource(true, async () => {
    const data = await api.list();

    let tasks: ITaskView[] = [];

    if (data.ok) tasks = data.val.map((task) => TaskView.fromObject(task));
    else window.location.href = '/login';

    return tasks.filter((task) => task.id != props.id);
  });

  return (
    <select
      class="form-select"
      aria-label="Default select example"
      onChange={(e) =>
        props.setTask({
          ...props.currentTask,
          parentId:
            e.currentTarget.value == 'undefined'
              ? undefined
              : parseInt(e.currentTarget.value),
        })
      }
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
    </select>
  );
};

export default ParentTaskSelect;
