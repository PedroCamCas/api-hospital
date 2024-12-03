import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50 })
  name: string;

  @Column({ nullable: false, unique: true, length: 100 })
  email: string;

  @Column({ nullable: false, length: 100 })
  password: string;
}
