import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type PasswordOmitUser = Omit<User, 'password'>;
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column()
  password: string;
}
