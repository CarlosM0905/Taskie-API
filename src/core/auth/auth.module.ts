import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const entities = [User];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
