import { IsOptional, IsIn } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsIn(['pending', 'done'])
  status?: 'pending' | 'done';
}
