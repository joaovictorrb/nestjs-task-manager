import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksServiceV1 } from './tasks-v1.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from '../dto/update-task-status.dto';

@Controller('tasks/v1')
export class TasksControllerV1 {
    constructor(private tasksService: TasksServiceV1) {}

    // localhost:3000/tasks/v1
    @Get()
    getTasks(
        @Query() filterDto: GetTasksFilterDto
    ): Task[] {
        if(Object.keys(filterDto).length) {
            return this.tasksService.getTaskWithFilters(filterDto);
        }
        return this.tasksService.getAllTasks();
    }

    // localhost:3000/tasks/v1/:id
    @Get('/:id')
    getTaskById(
        @Param('id') id: string
    ): Task {
        return this.tasksService.getTaskById(id);
    }

    // localhost:3000/tasks/v1/new
    @Post('new')
    createNewTask(
        @Body() createTaskDto: CreateTaskDto
    ): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    // localhost:3000/tasks/v1/:id
    @Delete('/:id')
    deleteTask (
        @Param('id') id: string
    ): void {
        this.tasksService.deleteTask(id);
    }
    
    // localhost:3000/tasks/v1/:id/status
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() input: UpdateTaskStatusDto
    ): Task {
        const { status } = input;
        return this.tasksService.updateTaskStatus(id, status)
    }
}
