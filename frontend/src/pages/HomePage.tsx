import { useNavigate } from '@solidjs/router';
import { Task } from 'common';
import { Show, createResource } from 'solid-js';
import { Result } from 'ts-results';

import TaskList from '../components/TaskList/TaskList';

import { IconButton } from '@/components/util/IconButton';
import api from '@/lib/api';
import { getTaskViewTree } from '@/lib/getTaskView';
import { ITaskView, TaskView } from '@/types/TaskView';

const HomePage = () => {
  const navigate = useNavigate();

  const [tasks, {refetch}] = createResource(true, async () => {
    const data = await api.list();
    let tasks: ITaskView[] = [];
    if (data.ok) {
      const taskTree: Result<ITaskView[], void> = getTaskViewTree(
        data.val.map((task) => new TaskView(Task.fromObject(task))),
      );
      if (taskTree.ok) tasks = taskTree.val;
    } else navigate('/login');

    return tasks;
  });

  return (
    <div>
      <IconButton onClick={() => navigate('/task/create')} icon="mdi:plus-outline">
        タスクを追加
      </IconButton>
      <Show
        when={tasks()?.length !== 0}
        fallback={
          <div class="m-2">
            <br />
            タスクが一つもありません。「タスクを追加」ボタンから新しくタスクを作りましょう！
          </div>
        }
      >
        <TaskList tasks={tasks()} refetch={refetch} />
      </Show>
    </div>
  );
};

export default HomePage;
