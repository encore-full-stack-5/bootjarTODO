import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosController } from './todos.controller';
import { Todo } from './entities/todos.entity';
import { RedisModule } from '@nestjs-modules/ioredis';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { EventHandlers } from './events/handlers';
import { JwtModule } from '@nestjs/jwt';
import { Friend } from './entities/friend.entity';
import { User } from './entities/user.entity';
import { RestController } from './rest.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo, Friend, User]),
    RedisModule,
    CqrsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    HttpModule,
  ],
  controllers: [RestController, TodosController],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class TodosModule {}
