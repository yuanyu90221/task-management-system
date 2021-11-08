import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search),
      );
    }
    return tasks;
  }
  getAllTasks() {
    return this.tasks;
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  getTaskById(getTaskDto: GetTaskDto): Task {
    const { id } = getTaskDto;
    const task = this.tasks.find((task) => task.id === id);
    return task;
  }
  deleteTaskById(deleteTaskDto: DeleteTaskDto): void {
    const { id } = deleteTaskDto;
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index >= 0) {
      this.tasks.splice(index, 1);
    }
  }

  updateTaskById(updateTaskDto: UpdateTaskDto): Task {
    const { id, status } = updateTaskDto;
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index >= 0) {
      this.tasks[index].status = status;
    }
    return index >= 0 ? this.tasks[index] : null;
  }
}
