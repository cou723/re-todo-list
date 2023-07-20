import {
  Controller,
  Request,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Body,
  UsePipes,
  ValidationPipe,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TaskService } from './task.service';
import { User } from 'src/user/user.entity';
import { CreateTaskDto } from './createTaskDto';
import { UpdateTaskDto } from './updateTaskDto';
import { Task, getCurrentPath } from './task.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
    @Body() task: CreateTaskDto,
    @Request() req: { user: User },
  ): Promise<void> {
    let path = '';
    if (task.parent) {
      const parent = await this.taskService.get(task.parent);
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
  getTasks() {
    try {
      return this.taskService.findAll();
    } catch (e) {
      throw new HttpException('Get all Tasks failed.', 500);
    }
  }

  @Get(':id')
  async getTask(@Param('id') id: number): Promise<Task> {
    return await this.taskService.get(id);
  }

  @Post(':id')
  @UsePipes(ValidationPipe)
  async updateTask(
    @Body() updateContents: UpdateTaskDto,
    @Param('id') id: number,
  ): Promise<void> {
    const targetTask = await this.taskService.get(id);
    if (updateContents.newParent)
      targetTask.path = getCurrentPath(
        await this.taskService.get(updateContents.newParent),
      );
    this.taskService.edit({
      ...targetTask,
      ...updateContents,
    });
  }

  // 削除が成功したかどうかは返さない
  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    return await this.taskService.delete(id);
  }

  @Post(':id/done')
  markTaskAsDone(@Param('id') id: number) {
    return `mark task ${id} as done`;
  }

  @Post(':id/undone')
  markTaskAsUndone(@Param('id') id: number) {
    return `mark task ${id} as undone`;
  }

  @Post(':id/parent')
  setParentTask(@Param('id') id: number) {
    return `set parent task ${id}`;
  }

  @Delete(':id/parent')
  removeParentTask(@Param('id') id: number) {
    return `remove parent task ${id}`;
  }
}
