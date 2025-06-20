import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [UsersService],
})
export class AuthModule {}
