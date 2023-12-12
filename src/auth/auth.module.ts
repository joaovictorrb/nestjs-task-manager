import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/db/database.module';
import { authProviders } from './auth.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...authProviders,
    AuthService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
