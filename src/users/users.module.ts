import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService], // Means this service can be injected into other parts of the application
  controllers: [UsersController], // Means this controller can handle incoming requests related to users
  imports: [TypeOrmModule.forFeature([User])], // Registers the User entity with TypeORM, allowing it to be used in the UsersService
})
export class UsersModule {}
