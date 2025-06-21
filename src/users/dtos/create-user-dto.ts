import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// This DTO is used to validate the data when creating a new user
// It ensures that the email is valid, and that the name and password are not empty strings
// It is used in the UsersController to validate incoming requests for user creation
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
