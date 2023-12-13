import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { UserEntity } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    // Relation between Tasks and User
    // Many to One
    @ManyToOne((_type) => UserEntity, (user) => user.tasks, { eager: false })
    // whenever object is printed, excludes user properties
    @Exclude({ toPlainOnly: true })
    user: UserEntity;
}
