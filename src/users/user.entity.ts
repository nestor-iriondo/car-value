import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

// This entity represents a user in the application.
// It defines the structure of the user table in the database.
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(
      'Inserted user with id',
      this.id,
      'and email',
      this.email,
      'and password',
      this.password,
    );
  }

  @AfterUpdate()
  logUpdate() {
    console.log(
      'Updated user with id',
      this.id,
      'and email',
      this.email,
      'and password',
      this.password,
    );
  }

  @AfterRemove()
  logRemove() {
    console.log(
      'Removed user with id',
      this.id,
      'and email',
      this.email,
      'and password',
      this.password,
    );
  }
}
