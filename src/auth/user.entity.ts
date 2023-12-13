import { TaskEntity } from 'src/tasks/v2/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    // Relation between User and Tasks
    // One to Many, 1 User for Many Tasks
    //
    @OneToMany(
        (_type) => TaskEntity,
        (task) => task.user,
        { eager: true },
        /**
         * Eager = true === whenever we fetch the user
         * we are also fetching tasks
         */
    )
    tasks: TaskEntity[];
}
