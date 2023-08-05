import { Card, Form } from 'solid-bootstrap';
import { type ITaskView } from '../types/TaskView';
import { For, createSignal } from 'solid-js';
import TaskDeleteFailedModal from './TaskDeleteFailedModal';
import TaskEditButtonGroup from './TaskEditButtonGroup';
import api from '../lib/api';

export const Task = (props: { class?: string; task: ITaskView }) => {
  const [showErrorModal, setShowErrorModal] = createSignal(false);
  const [isDone, setIsDone] = createSignal(props.task.isDone);

  const deleteFailed = () => {
    setShowErrorModal(true);
  };

  const handleClick = () => {
    setIsDone(!isDone());
    if (isDone()) api.done(props.task.id);
    else api.undone(props.task.id);
  };

  return (
    <Card class={props.class}>
      <Card.Header>
        <div class="d-flex justify-content-between">
          <div class="ml-4">
            <Form>
              <Form.Check
                type="checkbox"
                checked={isDone()}
                onClick={handleClick}
              />
            </Form>
            <span class="h4 ml-2">{props.task.title}</span>
          </div>
          <TaskEditButtonGroup id={props.task.id} failedDelete={deleteFailed} />
        </div>
      </Card.Header>
      <Card.Body>{props.task.description}</Card.Body>
      <For each={props.task.children}>
        {(child) => <Task class="m-3" task={child} />}
      </For>
      <TaskDeleteFailedModal
        show={showErrorModal()}
        handleClose={() => setShowErrorModal(false)}
      />
    </Card>
  );
};

export default Task;
