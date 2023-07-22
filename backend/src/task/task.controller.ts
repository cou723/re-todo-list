import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Body,
  UsePipes,
  ValidationPipe,
  HttpException,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TaskService } from './task.service';
import { User } from '../entity/user.entity';
import { Task, getCurrentPath } from '../entity/task.entity';

import { CreateTaskDto } from './createTaskDto';
import { UpdateTaskDto } from './updateTaskDto';
import { ParentDto } from './parentDto';

@UseGuards(AuthGuard('jwt'))
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
    @Body() task: CreateTaskDto,
    @Req() req: { user: User },
  ): Promise<void> {
    let path = '';
    if (task.parent) {
      const parent = await this.taskService.findTask(task.parent, req.user.id);
      path = `${parent.path}/${parent.id}`;
    }

    try {
      this.taskService.create({
        title: task.title,
        description: task.description,
        isDone: false,
        path,
        createdBy: req.user.id,
      });
    } catch (e) {
      throw new HttpException('Create Task failed.', 500);
    }
    return;
  }

  @Get('list')
  getTasks(@Req() req: { user: User }) {
    return this.taskService.findAll(req.user.id);
  }

  @Get(':id')
  async getTask(
    @Param('id') id: number,
    @Req() req: { user: User },
  ): Promise<Task> {
    return await this.taskService.findTask(id, req.user.id);
  }

  @Post(':id')
  @UsePipes(ValidationPipe)
  async updateTask(
    @Body() updateContents: UpdateTaskDto,
    @Req() req: { user: User },
    @Param('id') id: number,
  ): Promise<void> {
    const targetTask = await this.taskService.findTask(id, req.user.id);
    if (updateContents.newParent)
      targetTask.path = getCurrentPath(
        await this.taskService.findTask(updateContents.newParent, req.user.id),
      );
    this.taskService.edit(
      {
        ...targetTask,
        ...updateContents,
      },
      req.user.id,
    );
  }

  // 削除が成功したかどうかは返さない
  @Delete(':id')
  async deleteTask(
    @Param('id') id: number,
    @Req() req: { user: User },
  ): Promise<void> {
    return await this.taskService.delete(id, req.user.id);
  }

  @Post(':id/done')
  markTaskAsDone(@Param('id') id: number, @Req() req: { user: User }) {
    this.taskService.done(id, req.user.id);
  }

  @Post(':id/undone')
  markTaskAsUndone(@Param('id') id: number, @Req() req: { user: User }) {
    this.taskService.undone(id, req.user.id);
  }

  @Post(':id/parent')
  @UsePipes(ValidationPipe)
  async setParentTask(
    @Param('id') id: number,
    @Body() body: ParentDto,
    @Req() req: { user: User },
  ): Promise<void> {
    const currentTask = await this.taskService.findTask(id, req.user.id);
    this.taskService.edit(
      {
        ...currentTask,
        path: getCurrentPath(
          await this.taskService.findTask(body.newParent, req.user.id),
        ),
      },
      req.user.id,
    );
  }

  @Delete(':id/parent')
  async removeParentTask(
    @Param('id') id: number,
    @Req() req: { user: User },
  ): Promise<void> {
    const currentTask = await this.taskService.findTask(id, req.user.id);
    this.taskService.edit({ ...currentTask, path: '' }, req.user.id);
  }
}
