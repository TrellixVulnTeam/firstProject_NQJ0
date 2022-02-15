import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Next, NotFoundException, Param, ParseIntPipe, Post, Query, Render, Req, Res, SetMetadata, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-access.guard';
import { Role, Roles } from 'src/auth/strategy/roles.decorator';
import { RolesGuard } from 'src/auth/strategy/roles.guard';
import { JWTInterceptor } from 'src/interceptors/JWTInterceptor';
import { BooksService } from './books.service';
import { BookInfoModel, GetBooksListDto, PostBookDto } from './dto/book.dto';
import { PostCommentDto } from './dto/comment.dto';

@Controller('books')
export class BooksController {
    constructor(
        private booksService: BooksService,
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
        const model = await this.booksService.getBookInfoByID(bookID);
        if(!model) throw new NotFoundException();
        res.send(model);
    }

    @Get('/pages/info/:bookID')
    @Render('bookinfo.hbs')
    async getBookInfoPage(@Param('bookID') bookID){
        return {bookID};
    }


    @Get('/comments/:bookID')
    @UseInterceptors(JWTInterceptor)
    async getBookComment(@Param('bookID') bookID: number, @Req() req: Request, @Res() res: Response){
        const comments = await this.booksService.getComments(req.user?.userID, bookID);
        res.send(comments);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/comment/:bookID')
    async postBookComment(@Param('bookID') bookID: number, @Req() req: Request, @Res() res: Response){
        const dto: PostCommentDto = {
            bookID,
            userID: req.user.userID,
            text: req.body.text
        }
        try{
            const isSuccessed = await this.booksService.postComment(dto);
            if(!isSuccessed){
                throw new HttpException("요청이 잘못되었습니다.", HttpStatus.BAD_REQUEST);
            }
            res.send();
        } catch(e){
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/comment/:commentID')
    async deleteBookComment(@Param('commentID') commentID: number, @Req() req: Request, @Res() res: Response){
        try{
            const isSuccessed = await this.booksService.deleteComment(commentID);
            res.send();
        } catch(e){
            console.log(e);
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/comments/like/:commentID')
    async postCommentLike(@Param('commentID') commentID: number, @Req() req: Request, @Res() res: Response){
        await this.booksService.postCommentLike(commentID, req.user.userID);
        res.send();
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/comments/like/:commentID')
    async deleteCommentLike(@Param('commentID') commentID: number, @Req() req: Request, @Res() res : Response){
        await this.booksService.deleteCommentLike(commentID, req.user.userID);
        res.send();
    }
}