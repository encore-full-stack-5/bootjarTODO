import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo } from './entities/todos.entity';
import { RedisModule } from '@nestjs-modules/ioredis';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), RedisModule, CqrsModule],
  controllers: [TodosController],
  providers: [TodosService, ...QueryHandlers, ...CommandHandlers],
})
export class TodosModule {}
