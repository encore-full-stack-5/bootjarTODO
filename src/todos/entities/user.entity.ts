import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Todo } from './todos.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ name: 'user_nickname', length: 255 })
  userNickname: string;

  @OneToMany(() => Todo, (todo) => todo.user, { onDelete: 'CASCADE' })
  todos: Todo[];
}
