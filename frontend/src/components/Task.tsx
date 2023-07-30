import { Button, Card } from 'solid-bootstrap';
import { type ITaskView } from '../types/TaskView';
import { For, createSignal } from 'solid-js';
import TaskDeleteFailedModal from './TaskDeleteFailedModal';
import TaskEditButtonGroup from './TaskEditButtonGroup';

export const Task = (props: { class?: string; task: ITaskView }) => {
  const [showErrorModal, setShowErrorModal] = createSignal(false);

  const deleteFailed = () => {
    setShowErrorModal(true);
  }
  return <Card class={props.class}>
    <Card.Header><div class="d-flex justify-content-between">{props.task.title}<TaskEditButtonGroup id={props.task.id} failedDelete={deleteFailed}/></div></Card.Header>
    <Card.Body>{props.task.description}</Card.Body>
    <For each={props.task.children}>{(child) => <Task task={child} />}</For>
    <TaskDeleteFailedModal show={showErrorModal()} handleClose={()=>setShowErrorModal(false)} />
  </Card>
};

export default Task;
