import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    return await this.usersService.create(email, password);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const userId = parseInt(id);
    const user = await this.usersService.findOne(userId);
    return user;
  }

  @Get()
  async getUsers(@Query('email') email: string) {
    return await this.usersService.find(email);
  }
  // Note: The @Query decorator is used to extract query parameters from the request URL.

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: Partial<CreateUserDto>,
  ) {
    const userId = parseInt(id);
    return await this.usersService.update(userId, body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const userId = parseInt(id);
    return await this.usersService.remove(userId);
  }
}
