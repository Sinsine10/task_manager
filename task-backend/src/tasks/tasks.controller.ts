import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { Patch, ParseIntPipe } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
@Patch(':id/status')
async toggleStatus(@Param('id', ParseIntPipe) id: number): Promise<Task> {
  const task = await this.tasksService.findOne(id);
  const newStatus = task.status === 'done' ? 'pending' : 'done';
  return this.tasksService.update(id, { status: newStatus });
}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() taskData: Partial<Task>): Promise<Task> {
    return this.tasksService.create(taskData);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() taskData: Partial<Task>,
  ): Promise<Task> {
    return this.tasksService.update(id, taskData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}
