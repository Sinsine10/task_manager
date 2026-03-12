import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // ✅ Get all tasks
  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  // ✅ Get one task by ID
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  // ✅ Create a new task
  async create(taskData: Partial<Task>): Promise<Task> {
    const task = this.taskRepository.create(taskData);
    return this.taskRepository.save(task);
  }

 async update(id: number, taskData: Partial<Task>): Promise<Task> {
  const task = await this.findOne(id);
  Object.assign(task, taskData);
  return this.taskRepository.save(task);
}


  // ✅ Delete a task
  async remove(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
