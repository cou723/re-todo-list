export interface ITask {
  id: number;
  createdBy: number;
  title: string;
  description: string;
  isDone: boolean;
  path: string;
}

export class Task implements ITask {
  id: number;
  createdBy: number;
  title: string;
  description: string;
  isDone: boolean;
  path: string;

  constructor(
    id: number,
    createdBy: number,
    title: string = 'title',
    description: string = '',
    isDone: boolean = false,
    path: string = '',
  ) {
    this.id = id;
    this.createdBy = createdBy;
    this.title = title;
    this.description = description;
    this.isDone = isDone;
    this.path = path;
  }

  static fromObject(task: ITask): Task {
    return new Task(
      task.id,
      task.createdBy,
      task.title,
      task.description,
      task.isDone,
      task.path,
    );
  }

  getCurrentPath(this): string {
    return this.path + (this.path ? '/' : '') + this.id;
  }
}
