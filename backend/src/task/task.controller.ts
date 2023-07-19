import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TaskController {
  @UseGuards(AuthGuard('local'))
  @Post()
  createTask(): string {
    return 'create task';
  }

  @UseGuards(AuthGuard('local'))
  @Get('list')
  getTasks() {
    return 'all task';
  }

  @UseGuards(AuthGuard('local'))
  @Get(':id')
  getTask(@Param('id') id: string) {
    return `one task ${id}`;
  }

  @UseGuards(AuthGuard('local'))
  @Post(':id')
  updateTask(@Param('id') id: string) {
    return `update task ${id}`;
  }
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return `delete task ${id}`;
  }

  @Post(':id/done')
  markTaskAsDone(@Param('id') id: string) {
    return `mark task ${id} as done`;
  }

  @Post(':id/undone')
  markTaskAsUndone(@Param('id') id: string) {
    return `mark task ${id} as undone`;
  }

  @Post(':id/parent')
  setParentTask(@Param('id') id: string) {
    return `set parent task ${id}`;
  }

  @Delete(':id/parent')
  removeParentTask(@Param('id') id: string) {
    return `remove parent task ${id}`;
  }
}
