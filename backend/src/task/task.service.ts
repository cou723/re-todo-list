import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITask, Task } from 'common';
import { Like, Repository } from 'typeorm';

import { TaskEntity } from '@/entity/task.entity';

export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepos: Repository<TaskEntity>
  ) {}

  private async checkTargetValidity(taskId: number, userId: number): Promise<Task> {
    const task = await this.taskRepos.findOne({ where: { id: taskId } });
    if (!task) throw new HttpException(`task:${taskId} is not found`, 404);
    if (task.createdBy !== userId)
      throw new HttpException(`task:${userId} is not allow this user`, 403);
    return Task.fromObject(task);
  }

  async findTask(taskId: TaskEntity['id'], currentUserId: number): Promise<Task> {
    return Task.fromObject(await this.checkTargetValidity(taskId, currentUserId));
  }

  async findAll(currentUserId: number): Promise<Task[]> {
    return (
      await this.taskRepos.find({
        where: { createdBy: currentUserId },
      })
    ).map((task) => Task.fromObject(task));
  }

  async create(
    task: Omit<Omit<ITask, 'id'>, 'path'> & { parentId?: number | undefined }
  ): Promise<void> {
    const insertTask: Omit<ITask, 'id'> = {
      path: '',
      ...task,
    };
    const insertedTask = await this.taskRepos.save(insertTask);
    if (task.parentId === undefined) {
      await this.taskRepos.save({
        ...insertTask,
        path: `${insertedTask.id}`,
      });
    } else {
      const parentTask = await this.checkTargetValidity(task.parentId, task.createdBy);
      await this.taskRepos.save({
        ...insertTask,
        path: `${parentTask.path + '/' ?? ''}${insertedTask.id}`,
      });
    }
  }

  async edit(
    task: {
      description?: string;
      id: number;
      title?: string;
    },
    currentUserId: number
  ): Promise<void> {
    const currentTask = await this.checkTargetValidity(task.id, currentUserId);
    const updateTask = { ...currentTask, ...task };
    await this.taskRepos.save(updateTask);
  }

  async setParent(
    id: TaskEntity['id'],
    newParent: TaskEntity['id'],
    currentUserId: number
  ): Promise<void> {
    const currentTask = await this.checkTargetValidity(id, currentUserId);
    const newParentTask = await this.checkTargetValidity(newParent, currentUserId);

    await this.taskRepos.save({
      ...currentTask,
      path: `${newParentTask.path}/${currentTask.id}`,
    });
    await this.updateChildTasks(id, currentUserId);
  }

  async getChildTasks(parentId: TaskEntity['id']): Promise<ITask[]> {
    const regex = new RegExp(`^.*${parentId}/\\d*$`);

    const findBy = await this.taskRepos.findBy({
      path: Like(`%${parentId}/%`),
    });

    return findBy.filter((task) => regex.test(task.path));
  }

  async updateChildTasks(parentId: TaskEntity['id'], currentUserId: number): Promise<void> {
    const parentTask = await this.checkTargetValidity(parentId, currentUserId);

    const tasks = await this.getChildTasks(parentId);

    if (tasks.length == 0) return;

    for (const task of tasks) {
      await this.taskRepos.save({ ...task, path: `${parentTask.path}/${task.id}` });
      await this.updateChildTasks(task.id, currentUserId);
    }
  }

  async deleteParent(id: TaskEntity['id'], currentUserId: number): Promise<void> {
    const currentTask = await this.checkTargetValidity(id, currentUserId);
    await this.taskRepos.save({ ...currentTask, path: currentTask.id.toString() });
  }

  async delete(id: TaskEntity['id'], currentUserId: number): Promise<void> {
    // もしほかのタスクがこのタスクを親要素としてもっていたらそのタスクも削除する
    const tasks = await this.getChildTasks(id);
    for (const task of tasks) await this.delete(task.id, currentUserId);

    await this.taskRepos.delete({ id });
  }

  async setIsDone(id: TaskEntity['id'], currentUserId: number, isDone: boolean): Promise<void> {
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
