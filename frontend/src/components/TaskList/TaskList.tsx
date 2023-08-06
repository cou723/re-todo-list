import { For } from 'solid-js';
import { type ITaskView } from '@/types/TaskView';
import { Task } from './Task/Task';

const TaskList = (props: { tasks: ITaskView[] | undefined }) => {
  return (
    // gapがなぜか機能しない
    <div class="flex flex-col gap-4">
      <For each={props.tasks}>
        {(task) => <Task class="mt-4" task={task} />}
      </For>
    </div>
  );
};

export default TaskList;
