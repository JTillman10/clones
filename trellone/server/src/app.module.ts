import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users';
import { Config } from './config';

@Module({
  imports: [MongooseModule.forRoot(Config.mongoUrl), AuthModule, UsersModule],
})
export class AppModule {}
