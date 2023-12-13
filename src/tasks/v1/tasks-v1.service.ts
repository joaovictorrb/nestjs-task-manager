import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';

@Injectable()
export class TasksServiceV1 {
    private tasks: Task[] = [];

    // public by default
    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }

        if (search) {
            // it is case sensitive
            tasks = tasks.filter((task) => {
                if (
                    task.title.includes(search) ||
                    task.description.includes(search)
                )
                    return true;
                return false;
            });
        }

        return tasks;
    }

    getTaskById(id: string): Task {
        const hasTask = this.tasks.find((task) => task.id === id);

        if (!hasTask) {
            throw new NotFoundException(`Task Id - [${id}] - not found`);
        }
        return hasTask;
    }

    createTask(input: CreateTaskDto): Task {
        const { title, description } = input;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);

        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
