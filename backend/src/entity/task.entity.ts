import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdBy: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  isDone: boolean;

  @Column()
  path: string;
}

export function getCurrentPath(task: Task): string {
  return task.path + '/' + task.id;
}
