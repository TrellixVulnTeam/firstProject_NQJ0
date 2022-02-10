import { Controller, Get, Post, HttpException, HttpStatus, HttpCode, Body, Delete, UseGuards, Req, Res, UnauthorizedException, ValidationPipe, Patch, Param, BadRequestException, NotFoundException, ForbiddenException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {Request, Response} from 'express'
import * as fs from 'fs';
import * as path from 'path';
import { JwtRefreshGuard } from './strategy/jwt-refresh.guard';
import { LocalAuthGuard } from './strategy/local-auth.guard';
import { AuthService } from './auth.service';
import * as jwt from "jsonwebtoken";
import { JwtAuthGuard } from './strategy/jwt-access.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ){
        this.handleRefreshToken = authService.handleRefreshToken();
    }
    handleRefreshToken;

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserID(@Req() req, @Res() res: Response) {
        res.send(req.user);
    }

    //로그인 시 유저 정보 validate 후 Token들 발급.
    @UseGuards(LocalAuthGuard)
    @Post()
    @HttpCode(200)
    async loginUser(@Req() req: Request, @Res() res: Response){
        try{
            const refreshToken = await this.handleRefreshToken.issueToken(req.user);
            const accessToken = await this.authService.issueAccessToken(req.user);
            res.cookie('accessJWT', accessToken, {
                sameSite: 'lax',
            }).cookie('refreshJWT', refreshToken, {
                path: '/auth/jwt',
                sameSite: 'lax',
            }).send();
        } catch(e){
            throw new BadRequestException(e.message);
        }
    }

    //DB의 RefreshToken값 제거 후 클라이언트의 쿠키들 제거.
    @Delete()
    @HttpCode(200)
    async logoutUser(@Req() req: Request, @Res() res: Response){
        const user = jwt.decode(req.cookies.accessJWT);
        if(user) this.authService.handleRefreshToken().deleteToken(user);
        res.clearCookie('accessJWT')
        .clearCookie('refreshJWT', {path:"/auth/jwt"}).send();
    }

    //Refresh토큰 validate 후 재발급.
    //3번째
    @UseGuards(JwtRefreshGuard)
    @Get('/jwt')
    async issueAccessToken(@Req() req: Request, @Res() res: Response){
        const accessToken = await this.authService.issueAccessToken(req.user);
        res.cookie('accessJWT', accessToken, {
            sameSite: 'lax'
        }).send();
    }

    @Get('/:page')
    async getPage(@Param() params){
        try{
            return fs.readFileSync(path.join(this.configService.get('ROOT_PATH'), `/html/auth.${params.page}.html`)).toString('utf-8');
        }
        catch(e){
            throw new NotFoundException();
        }
    }
}
