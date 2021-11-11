import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskDto {
  id: string;
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
