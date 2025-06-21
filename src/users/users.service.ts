import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, password: string): Promise<User> {
    const user = this.repo.create({ email, password }); // Creates an instance of User with the provided email and password
    return this.repo.save(user); // Saves the user instance to the database
    // Why use create and not directly save?
    // Hooks like @AfterInsert, @AfterUpdate, and @AfterRemove are triggered when using create and save but not if we .save directly
  }
}
