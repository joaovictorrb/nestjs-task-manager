import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Repository } from "typeorm";

export class TasksServiceV2 {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    // interacts with db, so async
    async getTaskById(id: string): Promise<Task> {
        const foundTask = await this.taskRepository.findOneBy({id});

        if(!foundTask) throw new NotFoundException();

        return foundTask;
    }


    async createNewTask(input: CreateTaskDto): Promise<Task> {

        // another way to do it is creating a file repository and adding all db methods
        // into this file. 
        // then call those methods when needed
        const task = this.taskRepository.create({
            ...input,
            status: TaskStatus.OPEN
        });

        await this.taskRepository.save(task);

        return task;
    }
}