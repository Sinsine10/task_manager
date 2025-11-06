import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // your PostgreSQL username
      password: 'sinsine', // your actual password
      database: 'taskmanager', // name of your database
      entities: [Task],
      synchronize: true, // auto create tables during development
    }),
    TasksModule,
  ],
})
export class AppModule {}
