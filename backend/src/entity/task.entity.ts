import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ITask } from '../../../common/Task';

@Entity()
export class TaskEntity implements ITask {
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
