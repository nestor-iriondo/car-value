import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const existingUser = await this.usersService.find(email);

    if (existingUser.length) {
      throw new BadRequestException(`Email ${email} is already used.`);
    }

    const salt = randomBytes(8).toString('hex'); // Gives back a buffer that gets into hexadecimal
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');

    const newUser = await this.usersService.createUser(email, hashedPassword);

    return newUser;
  }

  async signin(email: string, password: string) {
    const [existingUser] = await this.usersService.find(email);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = existingUser.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad pasword');
    }

    return existingUser;
  }
}
