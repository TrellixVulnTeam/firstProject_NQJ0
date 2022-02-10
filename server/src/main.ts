import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import fs =  require("fs");
import * as path from 'path';
import cookieParser = require('cookie-parser');
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NotFoundExceptionFilter } from './filter/not-found.filter';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      //엔티티 데코레이터에 없는 값은 거른다.
      whitelist: true,
      //엔티티 데코레이터에 없는 값을 받으면 오류를 전송한다.
      forbidNonWhitelisted: true,
      //컨트롤러가 값을 받을 때 컨트롤러에 정의한 타입으로 형변환 시킨다.
      transform: true,
    })
  )
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useStaticAssets(path.join(__dirname,'..','..','client', 'public'));
  app.setBaseViewsDir(path.join(__dirname,'..','..','client', 'public', 'views'))
  app.setViewEngine("hbs");
  await app.listen(3000);
}
bootstrap();
