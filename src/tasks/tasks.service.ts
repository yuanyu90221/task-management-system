import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }
    return found;
  }
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  async deleteTaskById(deleteTaskDto: DeleteTaskDto): Promise<void> {
    const { id } = deleteTaskDto;
    const deleteResult = await this.taskRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }
  }
  async updateTaskById(updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { id, status } = updateTaskDto;
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }
  // getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.toLowerCase().includes(search) ||
  //         task.description.toLowerCase().includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  // getAllTasks() {
  //   return this.tasks;
  // }
}
