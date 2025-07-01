import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // see if email in use
    const existingUser = await this.usersService.find(email);

    if (existingUser.length) {
      throw new BadRequestException(`Email ${email} is already used.`);
    }

    // hash users password
    // generate salt
    const salt = randomBytes(8).toString('hex'); // Gives back a buffer that gets into hexadecimal

    // hash salt und password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // join hashed result and salt
    const hashedPassword = salt + '.' + hash.toString('hex');

    // create new user and save
    const newUser = await this.usersService.createUser(email, hashedPassword);

    // return user
    return newUser;
  }

  signin() {}
}
