import { Controller, Get, Redirect, Render, Req, Res, Session, SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}
}

