import { TaskEntity } from "./task.entity";
import { CreateTaskDto } from "../dto/create-task.dto";
import { BadRequestException, Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "../dto/get-tasks-filter.dto";
import { UserEntity } from "src/auth/user.entity";

export class TasksServiceV2 {
    constructor(
        @Inject('TASK_REPOSITORY')
        private taskRepository: Repository<TaskEntity>,
    ) {}

    async  getTasks(
        filterDto: GetTasksFilterDto, 
        user: UserEntity
    ): Promise<TaskEntity[]> {
        const { status, search } = filterDto;

        const query = this.taskRepository.createQueryBuilder('task');
        query.where({user})

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search}%` },
            );
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async getTaskById(id: string, user: UserEntity): Promise<TaskEntity> {
        const hasTask = await this.taskRepository.findOne({where: {id, user}});

        if(!hasTask) throw new NotFoundException();

        return hasTask;
    }

    async createNewTask(input: CreateTaskDto, user: UserEntity): Promise<TaskEntity> {
        const task = await this.taskRepository.create({
            ...input,
            status: TaskStatus.OPEN,
            user // link user to task
        });

        await this.taskRepository.save(task);

        return task;
    }

    async deleteTask(id: string, user: UserEntity): Promise<void> {
        const wasDeleted = await this.taskRepository.delete({id, user});
        if(wasDeleted.affected === 0) throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    async updateTaskStatus(id: string, status: TaskStatus, user: UserEntity): Promise<TaskEntity> {
        let task = await this.getTaskById(id, user);
        task.status = status;

        await this.taskRepository.save(task);
    
        return task;
    }
}