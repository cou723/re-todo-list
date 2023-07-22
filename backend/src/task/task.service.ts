import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entity/task.entity';

export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepos: Repository<Task>,
  ) {}

  private async checkPermission(taskId: number, userId: number): Promise<void> {
    const task = await this.taskRepos.findOne({ where: { id: taskId } });
    if (!task) throw new HttpException(`task:${taskId} is not found`, 404);
    if (task.createdBy !== userId)
      throw new HttpException(`task:${userId} is not allow this user`, 403);
  }

  async findTask(taskId: Task['id'], currentUserId: number): Promise<Task> {
    const task = await this.taskRepos.findOne({
      where: { id: taskId, createdBy: currentUserId },
    });
    if (!task) throw new HttpException(`task:${taskId} is not found`, 404);
    return task;
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
    await this.checkPermission(task.id, currentUserId);
    const result = await this.taskRepos.save(task);
    return result;
  }

  async delete(id: Task['id'], currentUserId: number): Promise<void> {
    await this.checkPermission(id, currentUserId);
    await this.taskRepos.delete({ id });
  }

  async done(id: Task['id'], currentUserId: number): Promise<void> {
    await this.checkPermission(id, currentUserId);
    const currentTask: Task = await this.taskRepos.findOne({ where: { id } });
    console.log(await this.taskRepos.find({}));

    try {
      await this.taskRepos.save({
        ...currentTask,
        isDone: true,
      });
    } catch (e) {
      console.log(e);
    }
    console.log(await this.taskRepos.find({}));

    console.log('finished');
  }

  async undone(id: Task['id'], currentUserId: number): Promise<void> {
    await this.checkPermission(id, currentUserId);
    await this.taskRepos.save({ id, isDone: false });
  }
}
