import { Controller, Get, Redirect, Render, Req, Res, Session, SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { Role, Roles } from './enums/role.enum';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get('/page/bookinfo')
  @Render('bookinfo')
    async getPageBookInfo(){
        return {message: "Hello, World!"};
    }
}

