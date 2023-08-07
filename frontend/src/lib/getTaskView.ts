import { Err, Ok, type Result } from 'ts-results';
import { type ITaskView } from '../types/TaskView';

export function getTaskViewTree(tasks: ITaskView[]): Result<ITaskView[], void> {
  const trees: ITaskView[] = [];
  const taskGroupList = tasks.reduce((acc: Map<string, ITaskView[]>, task) => {
    const key = task.path.split('/')[0];
    if (acc.has(key)) {
      acc.get(key)!.push(task);
    } else {
      acc.set(key, [task]);
    }

    return acc;
  }, new Map<string, ITaskView[]>());

  for (const taskGroup of taskGroupList) {
    trees.push(buildTree(taskGroup[1]));
  }

  return Ok(trees);
}

function buildTree(tasks: ITaskView[]): ITaskView {
  const root = taskToView(
    tasks.find((task: ITaskView) => !task.path.includes('/')),
  );
  if (root.err) throw new Error('Root node not found');

  addChildren(root.val, tasks);
  return root.val;
}

function addChildren(root: ITaskView, tasks: ITaskView[]) {
  const children = tasks.filter(
    (task) =>
      task.path.startsWith(root.path) &&
      task.path !== root.path &&
      task.path.split('/').length === root.path.split('/').length + 1,
  );
  root.children = children;
  children.forEach((child) => {
    addChildren(child, tasks);
  });
}

function taskToView(task: ITaskView | undefined): Result<ITaskView, void> {
  if (task === undefined) {
    return Err(undefined);
  }

  return Ok({
    ...task,
    children: [],
  });
}
