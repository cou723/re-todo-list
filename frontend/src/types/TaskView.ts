import { type Task, type ITask } from '../../../backend/common/Task';
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
  }
}
