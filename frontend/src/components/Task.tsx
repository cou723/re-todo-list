import { Button, Card } from 'solid-bootstrap';
import { type ITaskView } from '../types/TaskView';
import { For } from 'solid-js';

export const Task = (props: { task: ITaskView }) => (
  <Card>
    <Card.Header>props.task.title</Card.Header>
    <Card.Body>props.task.description</Card.Body>
    <For each={props.task.children}>{(child, i) => <Task task={child} />}</For>
    <Button>✏️</Button>
    <Button>🚮</Button>
  </Card>
);

export default Task;
