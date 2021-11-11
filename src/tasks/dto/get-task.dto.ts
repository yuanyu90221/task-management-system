import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetTaskDto {
  @IsUUID(4)
  @IsNotEmpty()
  id: string;
}
