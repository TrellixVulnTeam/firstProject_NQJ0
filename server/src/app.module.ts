import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import fs = require('fs');
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';

const pw = fs.readFileSync('C:\\mysql.txt', 'utf-8');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: pw,
      database: "book",
      entities: [join(__dirname, 'entities', '**')]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','..','client', 'public')
    }),
    BooksModule, UsersModule, AuthModule, AuthorsModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    //여기 정적파일 적용 안되게 설정하는 방법을 모르겠음.
    //consumer.apply(UserMiddleware).exclude('/auth/jwt', 'style/(.*)', 'dist/(.*)').forRoutes('**/**','/');
  }
}
