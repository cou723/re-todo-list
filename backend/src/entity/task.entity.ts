import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as Common from 'common';

@Entity()
export class TaskEntity implements Common.ITask {
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
