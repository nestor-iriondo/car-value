import { User } from 'src/users/user.entity';
import { Report } from 'src/reports/report.entity';

export const dbConfig = {
  type: 'sqlite' as const,
  database: 'db.sqlite',
  synchronize: true,
  entities: [User, Report],
};
