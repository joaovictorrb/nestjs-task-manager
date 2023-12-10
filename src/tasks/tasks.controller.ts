import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    // localhost:3000/tasks
    @Get()
    getTasks(
        @Query() filterDto: GetTasksFilterDto
    ): Task[] {
        if(Object.keys(filterDto).length) {
            return this.tasksService.getTaskWithFilters(filterDto);
        }
        return this.tasksService.getAllTasks();
    }

    // localhost:3000/tasks/:id
    @Get('/:id')
    getTaskById(
        @Param('id') id: string
    ): Task {
        return this.tasksService.getTaskById(id);
    }

    // localhost:3000/tasks/new
    @Post('new')
    createNewTask(
        @Body() createTaskDto: CreateTaskDto
    ): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    // localhost:3000/tasks/:id
    @Delete('/:id')
    deleteTask (
        @Param('id') id: string
    ): void {
        this.tasksService.deleteTask(id);
    }
    
    // localhost:3000/tasks/:id/status
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Task {
        return this.tasksService.updateTaskStatus(id, status)
    }
}
