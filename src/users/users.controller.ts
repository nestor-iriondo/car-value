import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Get,
  Query,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('signin')
  async signIn(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.findOne(Number(id));
  }

  @Get()
  async getUsers(@Query('email') email: string) {
    return await this.usersService.find(email);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.usersService.update(Number(id), body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.remove(Number(id));
  }
}
