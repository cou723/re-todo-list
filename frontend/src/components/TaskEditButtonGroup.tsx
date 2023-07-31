import { Button, ButtonGroup } from 'solid-bootstrap';
import TrashIcon from './TrashIcon';
import PenIcon from './PenIcon';
import api from '../lib/api';

const TaskEditButtonGroup = (props: {
  id: number;
  failedDelete: () => void;
}) => {
  const deleteTask = async () => {
    const res = await api.deleteIt(props.id);
    if (res.ok) window.location.href = '/';
    else props.failedDelete();
  };

  return (
    <ButtonGroup class="ms-auto">
      <Button size="sm" href={`/edit/${props.id}`}>
        <span class="mr-2">編集</span>
        <PenIcon />
      </Button>
      <Button size="sm" variant="danger" onClick={() => deleteTask()}>
        <span class="mr-2">削除</span>
        <TrashIcon />
      </Button>
    </ButtonGroup>
  );
};

export default TaskEditButtonGroup;
