import TaskList from '../components/TaskList/TaskList';
import api from '@/lib/api';
import { Task } from '@/../../backend/common/Task';
import { getTaskViewTree } from '@/lib/getTaskView';
import { Show, createResource } from 'solid-js';
import { ITaskView, TaskView } from '@/types/TaskView';
import { Result } from 'ts-results';
import AddIcon from '@/components/AddIcon';
import Button from '@/components/utils/Button';

// データのリストをとってくる
// データのリストの取得に失敗したらログインを促す
// データのリストをツリー構造に変換する
// 失敗したらエラーメッセージを表示する
// 成功したら表示して返す
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
      <Button onClick={() => (window.location.href = '/task/create')}>
        <span class="mr-2 align-bottom">
          <AddIcon />
        </span>
        タスクを追加
      </Button>
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
