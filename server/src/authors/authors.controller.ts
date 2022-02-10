import { BadRequestException, Body, Controller, Get, HttpCode, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { Role, Roles } from 'src/enums/role.enum';
import { Response } from 'express';


@Controller('authors')
export class AuthorsController {
    constructor(
        private authorsService: AuthorsService,
        private configService: ConfigService
    ){}

    //for test
    @Get('/list')
    async getAuthors(){
        try{
            const author = await this.authorsService.getAuthors();
            return author;
        } catch(e){
            throw new BadRequestException('잘못된 요청입니다.');
        }
    }

    @Roles(Role.Admin)
    @Post()
    @HttpCode(201)
    async postAuthor(@Body() body){
        try{
            await this.authorsService.postAuthor(body);
        } catch(e){
            throw new BadRequestException(e.message);
        }
    }

    @Get('/:page')
    async getPage(@Param() params, @Res() res: Response){
        try{
            return fs.readFileSync(path.join(this.configService.get('ROOT_PATH'), `/html/authors/authors.${params.page}.html`)).toString('utf-8');
        }
        catch(e){
            throw new NotFoundException();
        }
    }
}
