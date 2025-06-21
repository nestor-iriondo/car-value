import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './db/config';

@Module({
  imports: [UsersModule, ReportsModule, TypeOrmModule.forRoot(dbConfig)], // Importing the UsersModule and ReportsModule, and configuring TypeORM with the database settings
  controllers: [AppController], // Registering the AppController to handle incoming requests
  providers: [AppService], // Registering the AppService to provide application-wide services
})
export class AppModule {}
