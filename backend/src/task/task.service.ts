import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../entity/task.entity';
import { ITask, Task } from '../../common/Task';

export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepos: Repository<TaskEntity>,
  ) {}

  private async checkTargetValidity(
    taskId: number,
    userId: number,
  ): Promise<Task> {
    const task = await this.taskRepos.findOne({ where: { id: taskId } });
    if (!task) throw new HttpException(`task:${taskId} is not found`, 404);
    if (task.createdBy !== userId)
      throw new HttpException(`task:${userId} is not allow this user`, 403);
    return Task.fromObject(task);
  }

  async findTask(
    taskId: TaskEntity['id'],
    currentUserId: number,
  ): Promise<Task> {
    return Task.fromObject(
      await this.checkTargetValidity(taskId, currentUserId),
    );
  }

  async findAll(currentUserId: number): Promise<Task[]> {
    return (
      await this.taskRepos.find({
        where: { createdBy: currentUserId },
      })
    ).map((task) => Task.fromObject(task));
  }

  async create(task: Omit<ITask, 'id'>): Promise<void> {
    await this.taskRepos.insert(task);
    console.log(await this.taskRepos.find({}));
  }

  async edit(
    task: {
      id: number;
      title?: string;
      description?: string;
      path?: string;
    },
    currentUserId: number,
  ): Promise<void> {
    const currentTask = await this.checkTargetValidity(task.id, currentUserId);
    const updateTask = { ...currentTask, ...task };
    await this.taskRepos.save(updateTask);
  }

  async delete(id: TaskEntity['id'], currentUserId: number): Promise<void> {
    const currentTask = await this.checkTargetValidity(id, currentUserId);

    // もしほかのタスクがこのタスクを親要素としてもっていたらそのタスクも削除する
    const tasks = await this.taskRepos.find({
      where: { path: currentTask.getCurrentPath() },
    });
    for (const task of tasks) await this.delete(task.id, currentUserId);

    await this.taskRepos.delete({ id });
  }

  async setIsDone(
    id: TaskEntity['id'],
    currentUserId: number,
    isDone: boolean,
  ): Promise<void> {
    const currentTask = await this.checkTargetValidity(id, currentUserId);
    try {
      await this.taskRepos.save({
        ...currentTask,
        isDone,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
