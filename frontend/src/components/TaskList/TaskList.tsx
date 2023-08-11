import { For } from 'solid-js';

import { Task } from './Task/Task';

import { type ITaskView } from '@/types/TaskView';

const TaskList = (props: { tasks: ITaskView[] | undefined }) => {
  return (
    <div class="flex flex-col gap-4">
      <For each={props.tasks}>{(task) => <Task class="mt-4" task={task} />}</For>
    </div>
  );
};

export default TaskList;
