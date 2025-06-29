import { Expose } from 'class-transformer';

export class UserDto {
  @Expose() // Expose decorator is used to include this property in serialization. Not required if all properties are to be exposed by default.
  id: number;
  @Expose()
  email: string;
}
