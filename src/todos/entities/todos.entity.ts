import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn({ name: 'todo_id' })
  todoId: number;

  // @ManyToOne(() => Category)
  // @JoinColumn({ name: 'categoryId' })
  // category: Category;
  //
  // @ManyToOne(() => User)
  // @JoinColumn({ name: 'userId' })
  // user: User;
  @Column({ name: 'category_id' })
  categoryId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'todo_title', length: 255, nullable: false })
  todoTitle: string;

  @Column({ name: 'todo_content', length: 255, nullable: false })
  todoContent: string;

  @Column({ name: 'todo_date', type: 'date', nullable: false })
  todoDate: Date;

  @Column({ name: 'todo_done', default: false })
  todoDone: boolean;

  @ManyToOne(() => Category, (category) => category.todos)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
