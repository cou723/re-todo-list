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
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto, UpdateTaskDto } from 'common';

import { ParentDto } from './parentDto';
import { TaskService } from './task.service';

import { TaskEntity } from '@/entity/task.entity';
import { User } from '@/entity/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() task: CreateTaskDto, @Req() req: { user: User }): Promise<void> {
    await this.taskService.create({
      createdBy: req.user.id,
      description: task.description,
      isDone: false,
      parentId: task.parentId ?? undefined,
      title: task.title,
    });
  }

  @Get('list')
  async getTasks(@Req() req: { user: User }): Promise<TaskEntity[]> {
    const list = await this.taskService.findAll(req.user.id);
    return list;
  }

  @Get(':id')
  async getTask(@Param('id') paramId: string, @Req() req: { user: User }): Promise<TaskEntity> {
    const id = parseId(paramId);
    return await this.taskService.findTask(id, req.user.id);
  }

  @Post(':id')
  @UsePipes(ValidationPipe)
  async updateTask(
    @Body() updateContents: UpdateTaskDto,
    @Req() req: { user: User },
    @Param('id') paramId: string
  ): Promise<void> {
    const id = parseId(paramId);

    await this.taskService.edit(
      {
        description: updateContents.description,
        id,
        title: updateContents.title,
      },
      req.user.id
    );

    if (updateContents.parent !== undefined) {
      await this.taskService.setParent(id, updateContents.parent, req.user.id);
    }
  }

  // 削除が成功したかどうかは返さない
  @HttpCode(204)
  @Delete(':id')
  async deleteTask(@Param('id') paramId: string, @Req() req: { user: User }): Promise<void> {
    const id = parseId(paramId);
    await this.taskService.delete(id, req.user.id);
  }

  @Post(':id/done')
  async markTaskAsDone(@Param('id') paramId: string, @Req() req: { user: User }) {
    const id = parseId(paramId);
    await this.taskService.setIsDone(id, req.user.id, true);
  }

  @Post(':id/undone')
  async markTaskAsUndone(@Param('id') paramId: string, @Req() req: { user: User }) {
    const id = parseId(paramId);
    await this.taskService.setIsDone(id, req.user.id, false);
  }

  @Post(':id/parent')
  @UsePipes(ValidationPipe)
  async setParentTask(
    @Param('id') paramId: string,
    @Body() body: ParentDto,
    @Req() req: { user: User }
  ): Promise<void> {
    await this.taskService.setParent(parseId(paramId), body.newParent, req.user.id);
  }

  @HttpCode(204)
  @Delete(':id/parent')
  async deleteParentTask(@Param('id') paramId: string, @Req() req: { user: User }): Promise<void> {
    const id = parseId(paramId);
    try {
      await this.taskService.deleteParent(id, req.user.id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }
}

function parseId(paramId: string): number {
  const id = parseInt(paramId, 10);
  if (isNaN(id)) {
    throw new HttpException('Invalid :id', 400);
  }
  return id;
}
