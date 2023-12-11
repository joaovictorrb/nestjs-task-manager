import { TaskEntity } from "./task.entity";
import { CreateTaskDto } from "../dto/create-task.dto";
import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "../dto/get-tasks-filter.dto";

export class TasksServiceV2 {
    constructor(
        @Inject('TASK_REPOSITORY')
        private taskRepository: Repository<TaskEntity>,
    ) {}

    async  getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
        const { status, search } = filterDto;

        const query = this.taskRepository.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
        query.andWhere(
            'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
            { search: `%${search}%` },
        );
        }

        const tasks = await query.getMany();
        return tasks;
    }

    // interacts with db, so async
    async getTaskById(id: string): Promise<TaskEntity> {
        const hasTask = await this.taskRepository.findOneBy({id});
        console.log(hasTask);
        if(!hasTask) throw new NotFoundException();

        return hasTask;
    }

    async createNewTask(input: CreateTaskDto): Promise<TaskEntity> {
        const task = await this.taskRepository.create({
            ...input,
            status: TaskStatus.OPEN
        });

        await this.taskRepository.save(task);

        return task;
    }

    async deleteTask(id: string): Promise<void> {
        const wasDeleted = await this.taskRepository.delete({id});
        if(wasDeleted.affected === 0) throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<TaskEntity> {
        // await is not needed in NestJS
        let task = await this.getTaskById(id);
        task.status = status;

        await this.taskRepository.save(task);
    
        return task;
    }
}