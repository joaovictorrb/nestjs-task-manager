import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/db/database.module';
import { authProviders } from './auth.providers';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    // not the right approach
    JwtModule.register({
      secret: 'aSecretBeAware',
      signOptions: {
        expiresIn: 3600
      }
    }),
    DatabaseModule
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ],
  providers: [
    ...authProviders,
    JwtStrategy,
    AuthService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
