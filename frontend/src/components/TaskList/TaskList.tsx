import { For } from 'solid-js';

import { Task } from './Task/Task';

import { type ITaskView } from '@/types/TaskView';

const TaskList = (props: { tasks: ITaskView[] | undefined ,refetch:any}) => {
  return (
    <div class="flex flex-col gap-4">
      <For each={props.tasks}>{(task) => <Task class="mt-4" task={task} reload={props.refetch}/>}</For>
    </div>
  );
};

export default TaskList;
