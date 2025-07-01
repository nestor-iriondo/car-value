import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable() // Injectable decorator marks this class as a provider that can be injected into other parts of the application
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async createUser(email: string, password: string): Promise<User> {
    const user = this.repo.create({ email, password }); // Creates an instance of User with the provided email and password
    return this.repo.save(user); // Saves the user instance to the database
    // Why use create and not directly save?
    // Hooks like @AfterInsert, @AfterUpdate, and @AfterRemove are triggered when using create and save but not if we .save directly
  }

  async findOne(id: number): Promise<User> {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async find(email: string): Promise<User[]> {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.repo.remove(user);
  }
}
