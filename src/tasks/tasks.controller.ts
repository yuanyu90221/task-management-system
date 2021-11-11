import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { identity } from 'rxjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
    // if (Object.keys(filterDto).length) {
    //   return this.tasksService.getTaskWithFilters(filterDto);
    // }
    // return this.tasksService.getAllTasks();
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
  @Get('/:id')
  getTaskById(@Param() getTaskDto: GetTaskDto): Promise<Task> {
    const { id } = getTaskDto;
    return this.tasksService.getTaskById(id);
  }
  @Delete('/:id')
  deleteTaskById(@Param() deleteTaskDto: DeleteTaskDto): Promise<void> {
    return this.tasksService.deleteTaskById(deleteTaskDto);
  }
  @Patch('/:id/status')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    updateTaskDto.id = id;
    return this.tasksService.updateTaskById(updateTaskDto);
  }
}
