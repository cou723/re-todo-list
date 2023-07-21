import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepos: Repository<Task>,
  ) {}

  private async checkPermission(taskId: number, userId: number): Promise<void> {
    if (
      (await this.taskRepos.findOne({ where: { id: taskId } })).createdBy !==
      userId
    )
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

  async create(task: Omit<Task, 'id'>): Promise<Task> {
    console.log('create:', task);
    return await this.taskRepos.save(task);
  }

  async edit(task: Task, currentUserId: number): Promise<Task> {
    this.checkPermission(task.id, currentUserId);
    return await this.taskRepos.save(task);
  }

  async delete(id: Task['id'], currentUserId: number): Promise<void> {
    this.checkPermission(id, currentUserId);
    await this.taskRepos.delete({ id });
  }

  async done(id: Task['id'], currentUserId: number): Promise<void> {
    this.checkPermission(id, currentUserId);
    await this.taskRepos.update({ id }, { isDone: true });
  }

  async undone(id: Task['id'], currentUserId: number): Promise<void> {
    this.checkPermission(id, currentUserId);
    await this.taskRepos.update({ id }, { isDone: false });
  }
}
