import { Task, type ITask } from 'common';
export type ITaskView = ITask & { children: ITaskView[] };

export class TaskView implements ITaskView {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  children: ITaskView[];
  path: string;
  createdBy: number;

  constructor(task: Task, children: TaskView[] = []) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.isDone = task.isDone;
    this.children = children;
    this.path = task.getCurrentPath();
    this.createdBy = task.createdBy;

    if (this.path.split('/').slice(-1)[0] !== this.id.toString()) {
      throw new Error(
        'path root is not this id(' + this.id + '): ' + this.path,
      );
    }
    if (this.path[0] === '/') {
      throw new Error('path cannot start with /: ' + this.path);
    }
  }

  public static fromObject(task: ITask): TaskView {
    return new TaskView(Task.fromObject(task));
  }
}
