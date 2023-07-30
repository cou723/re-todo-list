import { For } from 'solid-js';
import { Stack } from 'solid-bootstrap';
import { type ITaskView } from '../types/TaskView';
import { Task } from './Task';

const TaskList = (props: { tasks: ITaskView[] | undefined }) => {
  return (
    // gapがなぜか機能しない
    <Stack /* gap={3} */>
      <For each={props.tasks}>
        {(task) => <Task class="mt-4" task={task} />}
      </For>
    </Stack>
  );
};

export default TaskList;
