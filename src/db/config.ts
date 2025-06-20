import { User } from 'src/users/user.entity';

export const dbConfig = {
  type: 'sqlite' as const,
  database: 'db.sqlite',
  synchronize: true,
  entities: [User],
};
