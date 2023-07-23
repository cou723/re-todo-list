import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, getCurrentPath } from '../entity/task.entity';

export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepos: Repository<Task>,
  ) {}

  private async checkTargetValidity(
    taskId: number,
    userId: number,
  ): Promise<Task> {
    const task = await this.taskRepos.findOne({ where: { id: taskId } });
    if (!task) throw new HttpException(`task:${taskId} is not found`, 404);
    if (task.createdBy !== userId)
      throw new HttpException(`task:${userId} is not allow this user`, 403);
    return task;
  }

  async findTask(taskId: Task['id'], currentUserId: number): Promise<Task> {
    return this.checkTargetValidity(taskId, currentUserId);
  }

  async findAll(currentUserId: number): Promise<Task[]> {
    return await this.taskRepos.find({
      where: { createdBy: currentUserId },
    });
  }

  async create(task: Omit<Task, 'id'>): Promise<void> {
    await this.taskRepos.insert(task);
  }

  async edit(
    task: {
      id: number;
      title?: string;
      description?: string;
      path?: string;
    },
    currentUserId: number,
  ): Promise<Task> {
    const currentTask = await this.checkTargetValidity(task.id, currentUserId);
    const updateTask = { ...currentTask, ...task };
    console.log('task: ', task);
    const result = await this.taskRepos.save(updateTask);
    return result;
  }

  async delete(id: Task['id'], currentUserId: number): Promise<void> {
    const currentTask = await this.checkTargetValidity(id, currentUserId);

    // もしほかのタスクがこのタスクを親要素としてもっていたらそのタスクも削除する
    const tasks = await this.taskRepos.find({
      where: { path: getCurrentPath(currentTask) },
    });
    for (const task of tasks) await this.delete(task.id, currentUserId);

    await this.taskRepos.delete({ id });
  }

  async setIsDone(
    id: Task['id'],
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
