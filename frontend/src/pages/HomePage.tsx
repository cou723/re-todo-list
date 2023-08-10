import TaskList from '../components/TaskList/TaskList';
import api from '@/lib/api';
import { Task } from 'common';
import { getTaskViewTree } from '@/lib/getTaskView';
import { Show, createResource } from 'solid-js';
import { ITaskView, TaskView } from '@/types/TaskView';
import { Result } from 'ts-results';
import { IconButton } from '@/components/util/IconButton';

const HomePage = () => {
  const [tasks] = createResource(true, async () => {
    const data = await api.list();
    let tasks: ITaskView[] = [];
    if (data.ok) {
      const taskTree: Result<ITaskView[], void> = getTaskViewTree(
        data.val.map((task) => new TaskView(Task.fromObject(task))),
      );
      if (taskTree.ok) tasks = taskTree.val;
    } else window.location.href = '/login';

    return tasks;
  });

  return (
    <div>
      <IconButton
        onClick={() => (window.location.href = '/task/create')}
        icon="mdi:plus-outline"
      >
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
        <TaskList tasks={tasks()} />
      </Show>
    </div>
  );
};

export default HomePage;
