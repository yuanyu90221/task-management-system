import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteTaskDto {
  @IsUUID('4')
  @IsNotEmpty()
  id: string;
}
