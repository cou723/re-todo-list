import { Icon } from '@iconify-icon/solid';
import { useNavigate } from '@solidjs/router';

import Button from '@/components/util/Button';
import api from '@/lib/api';

const TaskEditButtonGroup = (props: {
  childTaskIdList: number[];
  failedDelete: () => void;
  id: number;
  reload:any;
}) => {
  const navigate = useNavigate();

  const deleteTask = async () => {
    const res = await api.deleteIt(props.id);
    if (res.ok) props.reload();
    else props.failedDelete();
  };

  return (
    <div>
      <Button
        href={`/edit/${props.id}?children=${props.childTaskIdList.join(',')}`}
        class="rounded-none rounded-l-xl"
      >
        <Icon class="text-2xl h-5" icon="mdi:pencil" />
      </Button>
      <Button variant="danger" onClick={() => deleteTask()} class="rounded-none rounded-r-xl">
        {/* <span class="mr-2">削除</span> */}
        <Icon class="text-2xl h-5" icon="mdi:delete" />
      </Button>
    </div>
  );
};

export default TaskEditButtonGroup;
