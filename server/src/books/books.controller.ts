import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Next, NotFoundException, Param, ParseIntPipe, Post, Query, Render, Req, Res, SetMetadata, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { Role, Roles } from 'src/enums/role.enum';
import { BooksService } from './books.service';
import { BookInfoModel, GetBooksListDto, PostBookDto } from './dto/books.dto';

@Controller('book')
export class BooksController {
    constructor(
        private booksService: BooksService,
        private configService: ConfigService,
    ){}

    @Get()
    async getBooksList(@Query('offset', ParseIntPipe) offset: number, @Query('limit', ParseIntPipe) limit: number){
        try{
            const dto : GetBooksListDto = {offset, limit};
            const res = await this.booksService.getBooksList(dto);
            return res;
        } catch(e) {
            throw new BadRequestException('잘못된 요청입니다.');
        }
    }

    @HttpCode(201)
    @Post()
    async postBook(@Body() body: PostBookDto){
        try{
            if(!(await this.booksService.postBook(body))){
                throw new Error('Error in postBook');
            }
        } catch(e){
            throw new BadRequestException(e.message);
        }
    }

    @Get('/info/:bookID')
    async getBookInfo(@Param('bookID', ParseIntPipe) bookID: number, @Req() req: Request, @Res() res: Response){

    }

    @Get('/page/info/:bookID')
    @Render('bookinfo.hbs')
    async getBookInfoPage(@Param('bookID') bookID){
        const model: BookInfoModel = await this.booksService.getBookInfoByID(bookID);
        if(!model) throw new NotFoundException();
        return model;
    }
}