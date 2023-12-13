import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { TasksServiceV2 } from './tasks-v2.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskStatusDto } from '../dto/update-task-status.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks/v2')
@UseGuards(AuthGuard())
export class TasksControllerV2 {
    constructor(private tasksService: TasksServiceV2) {}

    @Get()
    getTasks(
        @Query() filterDto: GetTasksFilterDto,
        @GetUser() user: UserEntity,
    ): Promise<TaskEntity[]> {
        return this.tasksService.getTasks(filterDto, user);
    }

    @Get(':id')
    async getTaskById(
        @Param('id') id: string,
        @GetUser() user: UserEntity,
    ): Promise<TaskEntity> {
        return await this.tasksService.getTaskById(id, user);
    }

    @Post('new')
    async createNewTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: UserEntity,
    ): Promise<TaskEntity> {
        return await this.tasksService.createNewTask(createTaskDto, user);
    }

    @Delete(':id')
    async deleteTask(
        @Param('id') id: string,
        @GetUser() user: UserEntity,
    ): Promise<void> {
        this.tasksService.deleteTask(id, user);
    }

    @Patch(':id/status')
    async updateTaskStatus(
        @Param('id') id: string,
        @Body() input: UpdateTaskStatusDto,
        @GetUser() user: UserEntity,
    ): Promise<TaskEntity> {
        const { status } = input;
        return this.tasksService.updateTaskStatus(id, status, user);
    }
}
