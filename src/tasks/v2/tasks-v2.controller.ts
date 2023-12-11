import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TaskEntity } from "./task.entity";
import { TasksServiceV2 } from "./tasks-v2.service";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskStatusDto } from "../dto/update-task-status.dto";
import { GetTasksFilterDto } from "../dto/get-tasks-filter.dto";

@Controller('tasks/v2')
export class TasksControllerV2 {
    constructor(private tasksService: TasksServiceV2) {}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
      return this.tasksService.getTasks(filterDto);
    }

    @Get('/:id')
    async getTaskById(
        @Param('id') id: string
    ): Promise<TaskEntity> {
        return await this.tasksService.getTaskById(id);
    }

    @Post('new')
    async createNewTask(
        @Body() createTaskDto: CreateTaskDto
    ): Promise<TaskEntity> {
        console.log("Testing");
        return await this.tasksService.createNewTask(createTaskDto);
    }

    @Delete('/:id')
    async deleteTask (
        @Param('id') id: string
    ): Promise<void> {
        this.tasksService.deleteTask(id);
    }
    
    @Patch('/:id/status')
    async updateTaskStatus(
        @Param('id') id: string,
        @Body() input: UpdateTaskStatusDto
    ): Promise<TaskEntity> {
        const { status } = input;
        return this.tasksService.updateTaskStatus(id, status)
    }
}