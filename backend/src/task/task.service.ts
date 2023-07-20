import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepos: Repository<Task>,
  ) {}

  async get(id: Task['id']): Promise<Task | undefined> {
    const task = await this.taskRepos.findOne({ where: { id } });
    if (!task) throw new HttpException(`task:${id} is not found`, 404);
    return task;
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepos.find();
  }

  async create(task: Omit<Task, 'id'>): Promise<Task> {
    console.log('create:', task);
    return await this.taskRepos.save(task);
  }

  async edit(task: Task): Promise<Task> {
    return await this.taskRepos.save(task);
  }

  async delete(id: Task['id']): Promise<void> {
    await this.taskRepos.delete({ id });
  }

  async done(id: Task['id']): Promise<void> {
    await this.taskRepos.update({ id }, { isDone: true });
  }

  async undone(id: Task['id']): Promise<void> {
    await this.taskRepos.update({ id }, { isDone: false });
  }
}
