import { For } from 'solid-js';
import { Stack } from 'solid-bootstrap';
import { type ITaskView } from '../types/TaskView';
import { Task } from './Task';

const TaskList = (props: { tasks: ITaskView[] | undefined }) => (
  <Stack>
    <For each={props.tasks}>{(task) => <Task task={task} />}</For>
  </Stack>
);

export default TaskList;
