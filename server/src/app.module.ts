import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from 'app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users';
import { mongoUrl } from './config';

import { FrontendMiddleware } from './middleware/frontend/frontend.middleware';

@Module({
  imports: [MongooseModule.forRoot(mongoUrl), AuthModule, UsersModule],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FrontendMiddleware).forRoutes({
      path: '/*',
      method: RequestMethod.ALL,
    });
  }
}
