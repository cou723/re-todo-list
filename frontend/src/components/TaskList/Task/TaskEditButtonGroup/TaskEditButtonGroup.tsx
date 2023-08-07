import Button from '@/components/util/Button';
import api from '@/lib/api';
import { Icon } from '@iconify-icon/solid';

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
    <div>
      <Button href={`/edit/${props.id}`} class="rounded-none rounded-l-xl">
        <Icon class="text-2xl h-5" icon="mdi:pencil" />
      </Button>
      <Button
        variant="danger"
        onClick={() => deleteTask()}
        class="rounded-none rounded-r-xl"
      >
        {/* <span class="mr-2">削除</span> */}
        <Icon class="text-2xl h-5" icon="mdi:delete" />
      </Button>
    </div>
  );
};

export default TaskEditButtonGroup;
